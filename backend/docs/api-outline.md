# Initial API Outline

## Health

- `GET /health`

## Auth

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`

Implemented now:
- register
- login
- me

Planned next:
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`

## Collections

- `GET /api/v1/collections`

## Resources

- `GET /api/v1/resources`
- `POST /api/v1/resources`
- `GET /api/v1/resources/:slug`
- `PATCH /api/v1/resources/:slug`
- `DELETE /api/v1/resources/:slug`

Implemented now:
- list public resources
- get resource by slug
- create resource for an authenticated user
- update owned resource
- delete owned resource

## Entries

- `GET /api/v1/resources/:slug/entries`
- `POST /api/v1/resources/:slug/entries`
- `PATCH /api/v1/entries/:id`
- `DELETE /api/v1/entries/:id`

Implemented now:
- list public entries for a public published resource
- create an entry inside an owned resource
- update owned entry
- delete owned entry

## Progress

- `GET /api/v1/me/progress`
- `POST /api/v1/me/entries/:id/interact`
