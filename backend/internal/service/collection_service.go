package service

import (
	"time"

	"github.com/Boyeep/nextjs-go-monorepo-kit/backend/internal/domain"
)

type CollectionService struct{}

func NewCollectionService() CollectionService {
	return CollectionService{}
}

func (s CollectionService) List() []domain.Collection {
	now := time.Now().UTC()

	return []domain.Collection{
		{
			ID:          "seed-client-portal",
			Slug:        "client-portal",
			Title:       "Client Portal",
			Category:    "Portal",
			Description: "A private-facing workspace pattern for files, resources, and account management.",
			Summary:     "A starter collection for client access and shared resources.",
			Published:   true,
			CreatedAt:   now,
			UpdatedAt:   now,
		},
		{
			ID:          "seed-operations-hub",
			Slug:        "operations-hub",
			Title:       "Operations Hub",
			Category:    "Ops",
			Description: "A sample structure for SOPs, internal documents, onboarding checklists, and workflows.",
			Summary:     "A flexible collection for internal teams and operational content.",
			Published:   true,
			CreatedAt:   now,
			UpdatedAt:   now,
		},
	}
}
