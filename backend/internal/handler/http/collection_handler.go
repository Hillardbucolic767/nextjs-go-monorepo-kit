package http

import (
	"net/http"

	"github.com/example/learning-platform-backend-template/internal/service"
)

type CollectionHandler struct {
	service service.CollectionService
}

func NewCollectionHandler(service service.CollectionService) CollectionHandler {
	return CollectionHandler{service: service}
}

func (h CollectionHandler) List(w http.ResponseWriter, _ *http.Request) {
	writeJSON(w, http.StatusOK, map[string]any{
		"data": h.service.List(),
	})
}
