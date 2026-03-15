package http

import (
	"errors"
	"net/http"

	"github.com/example/learning-platform-backend-template/internal/domain"
	"github.com/example/learning-platform-backend-template/internal/repository"
	"github.com/example/learning-platform-backend-template/internal/service"
)

type EntryHandler struct {
	service service.EntryService
}

func NewEntryHandler(service service.EntryService) EntryHandler {
	return EntryHandler{service: service}
}

func (h EntryHandler) ListByResource(w http.ResponseWriter, r *http.Request) {
	items, err := h.service.ListPublicByResourceSlug(r.Context(), r.PathValue("slug"))
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to load entries")
		return
	}

	writeJSON(w, http.StatusOK, map[string]any{"data": items})
}

func (h EntryHandler) Create(w http.ResponseWriter, r *http.Request) {
	userID, ok := UserIDFromContext(r.Context())
	if !ok {
		writeError(w, http.StatusUnauthorized, "missing authenticated user")
		return
	}

	var input domain.CreateEntryInput
	if err := readJSON(r, &input); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	item, err := h.service.Create(r.Context(), userID, r.PathValue("slug"), input)
	if err != nil {
		switch {
		case errors.Is(err, service.ErrInvalidInput):
			writeError(w, http.StatusBadRequest, "invalid entry payload")
		case errors.Is(err, repository.ErrResourceNotFound):
			writeError(w, http.StatusNotFound, "resource not found")
		case errors.Is(err, repository.ErrEntryConflict):
			writeError(w, http.StatusConflict, "entry position already exists")
		default:
			writeError(w, http.StatusInternalServerError, "failed to create entry")
		}
		return
	}

	writeJSON(w, http.StatusCreated, map[string]any{"data": item})
}

func (h EntryHandler) Update(w http.ResponseWriter, r *http.Request) {
	userID, ok := UserIDFromContext(r.Context())
	if !ok {
		writeError(w, http.StatusUnauthorized, "missing authenticated user")
		return
	}

	var input domain.UpdateEntryInput
	if err := readJSON(r, &input); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	item, err := h.service.Update(r.Context(), userID, r.PathValue("id"), input)
	if err != nil {
		switch {
		case errors.Is(err, service.ErrInvalidInput):
			writeError(w, http.StatusBadRequest, "invalid entry payload")
		case errors.Is(err, repository.ErrEntryNotFound):
			writeError(w, http.StatusNotFound, "entry not found")
		case errors.Is(err, repository.ErrEntryConflict):
			writeError(w, http.StatusConflict, "entry position already exists")
		default:
			writeError(w, http.StatusInternalServerError, "failed to update entry")
		}
		return
	}

	writeJSON(w, http.StatusOK, map[string]any{"data": item})
}

func (h EntryHandler) Delete(w http.ResponseWriter, r *http.Request) {
	userID, ok := UserIDFromContext(r.Context())
	if !ok {
		writeError(w, http.StatusUnauthorized, "missing authenticated user")
		return
	}

	if err := h.service.Delete(r.Context(), userID, r.PathValue("id")); err != nil {
		if errors.Is(err, repository.ErrEntryNotFound) {
			writeError(w, http.StatusNotFound, "entry not found")
			return
		}
		writeError(w, http.StatusInternalServerError, "failed to delete entry")
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
