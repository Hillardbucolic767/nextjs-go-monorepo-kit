package repository

import (
	"context"
	"errors"
	"strings"

	"github.com/example/learning-platform-backend-template/internal/domain"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

var (
	ErrResourceNotFound = errors.New("resource not found")
	ErrResourceConflict = errors.New("resource already exists")
)

type ResourceRepository struct {
	db *pgxpool.Pool
}

func NewResourceRepository(db *pgxpool.Pool) ResourceRepository {
	return ResourceRepository{db: db}
}

func (r ResourceRepository) ListPublic(ctx context.Context) ([]domain.Resource, error) {
	query := `
		SELECT id, owner_id, collection_id, slug, title, description, visibility, status, locale, entry_count, COALESCE(estimated_minutes, 0), created_at, updated_at
		FROM resources
		WHERE visibility = 'public' AND status = 'published'
		ORDER BY created_at DESC
	`

	rows, err := r.db.Query(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	return scanResources(rows)
}

func (r ResourceRepository) FindBySlug(ctx context.Context, slug string) (domain.Resource, error) {
	query := `
		SELECT id, owner_id, collection_id, slug, title, description, visibility, status, locale, entry_count, COALESCE(estimated_minutes, 0), created_at, updated_at
		FROM resources
		WHERE slug = $1
	`

	item, err := scanResource(r.db.QueryRow(ctx, query, slug))
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return domain.Resource{}, ErrResourceNotFound
		}
		return domain.Resource{}, err
	}

	return item, nil
}

func (r ResourceRepository) Create(ctx context.Context, ownerID, slug string, input domain.CreateResourceInput) (domain.Resource, error) {
	query := `
		INSERT INTO resources (owner_id, collection_id, slug, title, description, visibility, status, locale, estimated_minutes)
		VALUES (
			$1,
			CASE WHEN $2 = '' THEN NULL ELSE $2::uuid END,
			$3,
			$4,
			NULLIF($5, ''),
			$6,
			$7,
			$8,
			NULLIF($9, 0)
		)
		RETURNING id, owner_id, collection_id, slug, title, description, visibility, status, locale, entry_count, COALESCE(estimated_minutes, 0), created_at, updated_at
	`

	item, err := scanResource(r.db.QueryRow(
		ctx,
		query,
		ownerID,
		strings.TrimSpace(input.CollectionID),
		slug,
		input.Title,
		input.Description,
		input.Visibility,
		input.Status,
		input.Locale,
		input.EstimatedMinutes,
	))
	if err != nil {
		if isUniqueViolation(err) {
			return domain.Resource{}, ErrResourceConflict
		}
		return domain.Resource{}, err
	}

	return item, nil
}

func (r ResourceRepository) Update(ctx context.Context, ownerID, slug string, input domain.UpdateResourceInput) (domain.Resource, error) {
	query := `
		UPDATE resources
		SET
			collection_id = COALESCE(CASE WHEN $3 = '' THEN NULL ELSE $3::uuid END, collection_id),
			title = COALESCE(NULLIF($4, ''), title),
			description = COALESCE($5, description),
			visibility = COALESCE(NULLIF($6, ''), visibility),
			status = COALESCE(NULLIF($7, ''), status),
			locale = COALESCE(NULLIF($8, ''), locale),
			estimated_minutes = COALESCE($9, estimated_minutes),
			updated_at = NOW()
		WHERE owner_id = $1 AND slug = $2
		RETURNING id, owner_id, collection_id, slug, title, description, visibility, status, locale, entry_count, COALESCE(estimated_minutes, 0), created_at, updated_at
	`

	item, err := scanResource(r.db.QueryRow(
		ctx,
		query,
		ownerID,
		slug,
		stringValue(input.CollectionID),
		stringValue(input.Title),
		input.Description,
		stringValue(input.Visibility),
		stringValue(input.Status),
		stringValue(input.Locale),
		input.EstimatedMinutes,
	))
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return domain.Resource{}, ErrResourceNotFound
		}
		return domain.Resource{}, err
	}

	return item, nil
}

func (r ResourceRepository) Delete(ctx context.Context, ownerID, slug string) error {
	tag, err := r.db.Exec(ctx, `DELETE FROM resources WHERE owner_id = $1 AND slug = $2`, ownerID, slug)
	if err != nil {
		return err
	}

	if tag.RowsAffected() == 0 {
		return ErrResourceNotFound
	}

	return nil
}

type resourceScanner interface {
	Scan(dest ...any) error
}

func scanResource(scanner resourceScanner) (domain.Resource, error) {
	var item domain.Resource
	var collectionID *string
	var description *string

	err := scanner.Scan(
		&item.ID,
		&item.OwnerID,
		&collectionID,
		&item.Slug,
		&item.Title,
		&description,
		&item.Visibility,
		&item.Status,
		&item.Locale,
		&item.EntryCount,
		&item.EstimatedMinutes,
		&item.CreatedAt,
		&item.UpdatedAt,
	)
	if err != nil {
		return domain.Resource{}, err
	}

	if collectionID != nil {
		item.CollectionID = *collectionID
	}
	if description != nil {
		item.Description = *description
	}

	return item, nil
}

func scanResources(rows pgx.Rows) ([]domain.Resource, error) {
	items := make([]domain.Resource, 0)
	for rows.Next() {
		item, err := scanResource(rows)
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

func stringValue(value *string) any {
	if value == nil {
		return nil
	}
	return strings.TrimSpace(*value)
}
