package service

import (
	"context"
	"errors"
	"strings"

	"github.com/Boyeep/nextjs-go-monorepo-kit/backend/internal/domain"
	"github.com/Boyeep/nextjs-go-monorepo-kit/backend/internal/repository"
)

type EntryService struct {
	repository repository.EntryRepository
}

func NewEntryService(repository repository.EntryRepository) EntryService {
	return EntryService{repository: repository}
}

func (s EntryService) ListPublicByResourceSlug(ctx context.Context, resourceSlug string) ([]domain.Entry, error) {
	return s.repository.ListPublicByResourceSlug(ctx, strings.TrimSpace(resourceSlug))
}

func (s EntryService) Create(ctx context.Context, ownerID, resourceSlug string, input domain.CreateEntryInput) (domain.Entry, error) {
	input = normalizeCreateEntryInput(input)
	if input.Position < 1 || input.Title == "" || input.Content == "" {
		return domain.Entry{}, ErrInvalidInput
	}

	item, err := s.repository.Create(ctx, ownerID, strings.TrimSpace(resourceSlug), input)
	if err != nil {
		if errors.Is(err, repository.ErrResourceNotFound) || errors.Is(err, repository.ErrEntryConflict) {
			return domain.Entry{}, err
		}
		return domain.Entry{}, err
	}

	return item, nil
}

func (s EntryService) Update(ctx context.Context, ownerID, entryID string, input domain.UpdateEntryInput) (domain.Entry, error) {
	input = normalizeUpdateEntryInput(input)
	if input.Position != nil && *input.Position < 1 {
		return domain.Entry{}, ErrInvalidInput
	}
	if input.Title != nil && *input.Title == "" {
		return domain.Entry{}, ErrInvalidInput
	}
	if input.Content != nil && *input.Content == "" {
		return domain.Entry{}, ErrInvalidInput
	}

	return s.repository.Update(ctx, ownerID, strings.TrimSpace(entryID), input)
}

func (s EntryService) Delete(ctx context.Context, ownerID, entryID string) error {
	return s.repository.Delete(ctx, ownerID, strings.TrimSpace(entryID))
}

func normalizeCreateEntryInput(input domain.CreateEntryInput) domain.CreateEntryInput {
	input.Title = strings.TrimSpace(input.Title)
	input.Content = strings.TrimSpace(input.Content)
	input.Details = strings.TrimSpace(input.Details)
	input.Notes = strings.TrimSpace(input.Notes)
	return input
}

func normalizeUpdateEntryInput(input domain.UpdateEntryInput) domain.UpdateEntryInput {
	if input.Title != nil {
		value := strings.TrimSpace(*input.Title)
		input.Title = &value
	}
	if input.Content != nil {
		value := strings.TrimSpace(*input.Content)
		input.Content = &value
	}
	if input.Details != nil {
		value := strings.TrimSpace(*input.Details)
		input.Details = &value
	}
	if input.Notes != nil {
		value := strings.TrimSpace(*input.Notes)
		input.Notes = &value
	}
	return input
}
