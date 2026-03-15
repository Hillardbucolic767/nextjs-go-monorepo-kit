package http

import (
	"errors"
	"net/http"

	"github.com/Boyeep/nextjs-go-monorepo-kit/backend/internal/domain"
	"github.com/Boyeep/nextjs-go-monorepo-kit/backend/internal/repository"
	"github.com/Boyeep/nextjs-go-monorepo-kit/backend/internal/service"
)

type ResourceHandler struct {
	service service.ResourceService
}

func NewResourceHandler(service service.ResourceService) ResourceHandler {
	return ResourceHandler{service: service}
}

func (h ResourceHandler) List(w http.ResponseWriter, r *http.Request) {
	items, err := h.service.ListPublic(r.Context())
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to load resources")
		return
	}

	writeJSON(w, http.StatusOK, map[string]any{"data": items})
}

func (h ResourceHandler) Get(w http.ResponseWriter, r *http.Request) {
	item, err := h.service.GetBySlug(r.Context(), r.PathValue("slug"))
	if err != nil {
		if errors.Is(err, repository.ErrResourceNotFound) {
			writeError(w, http.StatusNotFound, "resource not found")
			return
		}
		writeError(w, http.StatusInternalServerError, "failed to load resource")
		return
	}

	writeJSON(w, http.StatusOK, map[string]any{"data": item})
}

func (h ResourceHandler) Create(w http.ResponseWriter, r *http.Request) {
	userID, ok := UserIDFromContext(r.Context())
	if !ok {
		writeError(w, http.StatusUnauthorized, "missing authenticated user")
		return
	}

	var input domain.CreateResourceInput
	if err := readJSON(r, &input); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	item, err := h.service.Create(r.Context(), userID, input)
	if err != nil {
		switch {
		case errors.Is(err, service.ErrInvalidInput):
			writeError(w, http.StatusBadRequest, "invalid resource payload")
		case errors.Is(err, repository.ErrResourceConflict):
			writeError(w, http.StatusConflict, "resource already exists")
		default:
			writeError(w, http.StatusInternalServerError, "failed to create resource")
		}
		return
	}

	writeJSON(w, http.StatusCreated, map[string]any{"data": item})
}

func (h ResourceHandler) Update(w http.ResponseWriter, r *http.Request) {
	userID, ok := UserIDFromContext(r.Context())
	if !ok {
		writeError(w, http.StatusUnauthorized, "missing authenticated user")
		return
	}

	var input domain.UpdateResourceInput
	if err := readJSON(r, &input); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	item, err := h.service.Update(r.Context(), userID, r.PathValue("slug"), input)
	if err != nil {
		switch {
		case errors.Is(err, service.ErrInvalidInput):
			writeError(w, http.StatusBadRequest, "invalid resource payload")
		case errors.Is(err, repository.ErrResourceNotFound):
			writeError(w, http.StatusNotFound, "resource not found")
		default:
			writeError(w, http.StatusInternalServerError, "failed to update resource")
		}
		return
	}

	writeJSON(w, http.StatusOK, map[string]any{"data": item})
}

func (h ResourceHandler) Delete(w http.ResponseWriter, r *http.Request) {
	userID, ok := UserIDFromContext(r.Context())
	if !ok {
		writeError(w, http.StatusUnauthorized, "missing authenticated user")
		return
	}

	if err := h.service.Delete(r.Context(), userID, r.PathValue("slug")); err != nil {
		if errors.Is(err, repository.ErrResourceNotFound) {
			writeError(w, http.StatusNotFound, "resource not found")
			return
		}
		writeError(w, http.StatusInternalServerError, "failed to delete resource")
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
