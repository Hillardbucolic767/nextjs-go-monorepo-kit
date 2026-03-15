package repository

import (
	"context"
	"errors"
	"strings"

	"github.com/Boyeep/nextjs-go-monorepo-kit/backend/internal/domain"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

var (
	ErrEntryNotFound = errors.New("entry not found")
	ErrEntryConflict = errors.New("entry already exists")
)

type EntryRepository struct {
	db *pgxpool.Pool
}

func NewEntryRepository(db *pgxpool.Pool) EntryRepository {
	return EntryRepository{db: db}
}

func (r EntryRepository) ListPublicByResourceSlug(ctx context.Context, resourceSlug string) ([]domain.Entry, error) {
	query := `
		SELECT e.id, e.resource_id, e.position, e.title, e.content, e.details, e.notes, e.created_at, e.updated_at
		FROM entries e
		INNER JOIN resources r ON r.id = e.resource_id
		WHERE r.slug = $1 AND r.visibility = 'public' AND r.status = 'published'
		ORDER BY e.position ASC, e.created_at ASC
	`

	rows, err := r.db.Query(ctx, query, strings.TrimSpace(resourceSlug))
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	return scanEntries(rows)
}

func (r EntryRepository) Create(ctx context.Context, ownerID, resourceSlug string, input domain.CreateEntryInput) (domain.Entry, error) {
	tx, err := r.db.BeginTx(ctx, pgx.TxOptions{})
	if err != nil {
		return domain.Entry{}, err
	}
	defer func() {
		_ = tx.Rollback(ctx)
	}()

	var resourceID string
	if err := tx.QueryRow(ctx, `SELECT id FROM resources WHERE owner_id = $1 AND slug = $2`, ownerID, strings.TrimSpace(resourceSlug)).Scan(&resourceID); err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return domain.Entry{}, ErrResourceNotFound
		}
		return domain.Entry{}, err
	}

	query := `
		INSERT INTO entries (resource_id, position, title, content, details, notes)
		VALUES ($1, $2, $3, $4, NULLIF($5, ''), NULLIF($6, ''))
		RETURNING id, resource_id, position, title, content, details, notes, created_at, updated_at
	`

	item, err := scanEntry(tx.QueryRow(
		ctx,
		query,
		resourceID,
		input.Position,
		input.Title,
		input.Content,
		input.Details,
		input.Notes,
	))
	if err != nil {
		if isUniqueViolation(err) {
			return domain.Entry{}, ErrEntryConflict
		}
		return domain.Entry{}, err
	}

	if _, err := tx.Exec(ctx, `UPDATE resources SET entry_count = entry_count + 1, updated_at = NOW() WHERE id = $1`, resourceID); err != nil {
		return domain.Entry{}, err
	}

	if err := tx.Commit(ctx); err != nil {
		return domain.Entry{}, err
	}

	return item, nil
}

func (r EntryRepository) Update(ctx context.Context, ownerID, entryID string, input domain.UpdateEntryInput) (domain.Entry, error) {
	query := `
		UPDATE entries e
		SET
			position = COALESCE($3, e.position),
			title = COALESCE(NULLIF($4, ''), e.title),
			content = COALESCE(NULLIF($5, ''), e.content),
			details = COALESCE($6, e.details),
			notes = COALESCE($7, e.notes),
			updated_at = NOW()
		FROM resources r
		WHERE e.resource_id = r.id AND r.owner_id = $1 AND e.id = $2
		RETURNING e.id, e.resource_id, e.position, e.title, e.content, e.details, e.notes, e.created_at, e.updated_at
	`

	item, err := scanEntry(r.db.QueryRow(
		ctx,
		query,
		ownerID,
		strings.TrimSpace(entryID),
		input.Position,
		stringValue(input.Title),
		stringValue(input.Content),
		input.Details,
		input.Notes,
	))
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return domain.Entry{}, ErrEntryNotFound
		}
		if isUniqueViolation(err) {
			return domain.Entry{}, ErrEntryConflict
		}
		return domain.Entry{}, err
	}

	return item, nil
}

func (r EntryRepository) Delete(ctx context.Context, ownerID, entryID string) error {
	tx, err := r.db.BeginTx(ctx, pgx.TxOptions{})
	if err != nil {
		return err
	}
	defer func() {
		_ = tx.Rollback(ctx)
	}()

	var resourceID string
	if err := tx.QueryRow(ctx, `
		DELETE FROM entries e
		USING resources r
		WHERE e.resource_id = r.id AND r.owner_id = $1 AND e.id = $2
		RETURNING e.resource_id
	`, ownerID, strings.TrimSpace(entryID)).Scan(&resourceID); err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return ErrEntryNotFound
		}
		return err
	}

	if _, err := tx.Exec(ctx, `UPDATE resources SET entry_count = GREATEST(entry_count - 1, 0), updated_at = NOW() WHERE id = $1`, resourceID); err != nil {
		return err
	}

	if err := tx.Commit(ctx); err != nil {
		return err
	}

	return nil
}

type entryScanner interface {
	Scan(dest ...any) error
}

func scanEntry(scanner entryScanner) (domain.Entry, error) {
	var item domain.Entry
	var details *string
	var notes *string

	err := scanner.Scan(
		&item.ID,
		&item.ResourceID,
		&item.Position,
		&item.Title,
		&item.Content,
		&details,
		&notes,
		&item.CreatedAt,
		&item.UpdatedAt,
	)
	if err != nil {
		return domain.Entry{}, err
	}

	if details != nil {
		item.Details = *details
	}
	if notes != nil {
		item.Notes = *notes
	}

	return item, nil
}

func scanEntries(rows pgx.Rows) ([]domain.Entry, error) {
	items := make([]domain.Entry, 0)
	for rows.Next() {
		item, err := scanEntry(rows)
		if err != nil {
			return nil, err
		}
		items = append(items, item)
	}

	if rows.Err() != nil {
		return nil, rows.Err()
	}

	return items, nil
}
