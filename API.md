# API Documentation (Phase 1)

Base URL (local):
http://localhost:3000/api

Swagger UI:
http://localhost:3000/docs

---

## Authentication

### POST /auth/register
Register a new user.

Request body:
```json
{
  "email": "user@test.com",
  "password": "password123",
  "tenantId": "uuid"
}
