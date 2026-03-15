package service

import (
	"context"
	"errors"
	"fmt"
	"regexp"
	"strings"
	"time"

	"github.com/Boyeep/nextjs-go-monorepo-kit/backend/internal/domain"
	"github.com/Boyeep/nextjs-go-monorepo-kit/backend/internal/repository"
)

var slugSanitizer = regexp.MustCompile(`[^a-z0-9]+`)

type ResourceService struct {
	repository repository.ResourceRepository
}

func NewResourceService(repository repository.ResourceRepository) ResourceService {
	return ResourceService{repository: repository}
}

func (s ResourceService) ListPublic(ctx context.Context) ([]domain.Resource, error) {
	return s.repository.ListPublic(ctx)
}

func (s ResourceService) GetBySlug(ctx context.Context, slug string) (domain.Resource, error) {
	return s.repository.FindBySlug(ctx, strings.TrimSpace(slug))
}

func (s ResourceService) Create(ctx context.Context, ownerID string, input domain.CreateResourceInput) (domain.Resource, error) {
	input = normalizeCreateInput(input)
	if input.Title == "" || !isValidVisibility(input.Visibility) || !isValidStatus(input.Status) {
		return domain.Resource{}, ErrInvalidInput
	}

	slug := buildSlug(input.Title)
	if slug == "" {
		return domain.Resource{}, ErrInvalidInput
	}

	item, err := s.repository.Create(ctx, ownerID, fmt.Sprintf("%s-%d", slug, time.Now().Unix()), input)
	if err != nil {
		if errors.Is(err, repository.ErrResourceConflict) {
			return domain.Resource{}, err
		}
		return domain.Resource{}, err
	}

	return item, nil
}

func (s ResourceService) Update(ctx context.Context, ownerID, slug string, input domain.UpdateResourceInput) (domain.Resource, error) {
	input = normalizeUpdateInput(input)
	if input.Visibility != nil && !isValidVisibility(*input.Visibility) {
		return domain.Resource{}, ErrInvalidInput
	}
	if input.Status != nil && !isValidStatus(*input.Status) {
		return domain.Resource{}, ErrInvalidInput
	}

	return s.repository.Update(ctx, ownerID, strings.TrimSpace(slug), input)
}

func (s ResourceService) Delete(ctx context.Context, ownerID, slug string) error {
	return s.repository.Delete(ctx, ownerID, strings.TrimSpace(slug))
}

func normalizeCreateInput(input domain.CreateResourceInput) domain.CreateResourceInput {
	input.Title = strings.TrimSpace(input.Title)
	input.Description = strings.TrimSpace(input.Description)
	input.CollectionID = strings.TrimSpace(input.CollectionID)
	input.Visibility = strings.TrimSpace(strings.ToLower(defaultIfEmpty(input.Visibility, "private")))
	input.Status = strings.TrimSpace(strings.ToLower(defaultIfEmpty(input.Status, "draft")))
	input.Locale = strings.TrimSpace(strings.ToLower(defaultIfEmpty(input.Locale, "en")))
	return input
}

func normalizeUpdateInput(input domain.UpdateResourceInput) domain.UpdateResourceInput {
	if input.CollectionID != nil {
		value := strings.TrimSpace(*input.CollectionID)
		input.CollectionID = &value
	}
	if input.Title != nil {
		value := strings.TrimSpace(*input.Title)
		input.Title = &value
	}
	if input.Description != nil {
		value := strings.TrimSpace(*input.Description)
		input.Description = &value
	}
	if input.Visibility != nil {
		value := strings.TrimSpace(strings.ToLower(*input.Visibility))
		input.Visibility = &value
	}
	if input.Status != nil {
		value := strings.TrimSpace(strings.ToLower(*input.Status))
		input.Status = &value
	}
	if input.Locale != nil {
		value := strings.TrimSpace(strings.ToLower(*input.Locale))
		input.Locale = &value
	}
	return input
}

func buildSlug(value string) string {
	slug := strings.ToLower(strings.TrimSpace(value))
	slug = slugSanitizer.ReplaceAllString(slug, "-")
	return strings.Trim(slug, "-")
}

func isValidVisibility(value string) bool {
	switch value {
	case "private", "unlisted", "public":
		return true
	default:
		return false
	}
}

func isValidStatus(value string) bool {
	switch value {
	case "draft", "published", "archived":
		return true
	default:
		return false
	}
}

func defaultIfEmpty(value, fallback string) string {
	if strings.TrimSpace(value) == "" {
		return fallback
	}
	return value
}
