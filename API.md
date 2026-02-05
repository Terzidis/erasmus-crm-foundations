# API (Phase 1)

## Base URL
- Local: `http://localhost:3000/api`
- Production: `https://<YOUR-RAILWAY-API-DOMAIN>/api`

## Swagger / OpenAPI
- Local: `http://localhost:3000/api/docs`
- Production (if enabled): `postgresql://postgres:kXwbqOyDHPMRmenKidXFcwxwRMtYRPyj@centerbeam.proxy.rlwy.net:19484/railway`

> Note: Swagger may be disabled in production depending on configuration.

---

## Authentication

### Tokens
- **Access Token (JWT):** sent in header `Authorization: Bearer <token>`
- **Refresh Token:** used for `/auth/refresh` (stored client-side or via secure cookie depending on implementation)

### Standard Headers
- `Authorization: Bearer <access_token>`
- `Content-Type: application/json`

---

## Error format (standard)
All errors return JSON with:
- `statusCode`
- `message`
- `error`

Example:
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}

Endpoints (Phase 1)
Health & Info
Method	Endpoint	Description	Auth
GET	/health	Health check	No
GET	/info	App info (version/environment)	No
Auth
Method	Endpoint	Description	Auth
POST	/auth/register	User registration	No
POST	/auth/login	Login (returns access + refresh)	No
POST	/auth/logout	Logout (revoke session)	Yes
POST	/auth/refresh	Refresh access token	No/Partial*
GET	/auth/me	Current user info	Yes

* /auth/refresh typically requires refresh token; may not require access token.

Tenants (Admin)
Method	Endpoint	Description	Auth
GET	/tenants	List tenants	Yes (Admin)
POST	/tenants	Create tenant	Yes (Admin)
GET	/tenants/:id	Get tenant	Yes (Admin)
PUT	/tenants/:id	Update tenant	Yes (Admin)
Users
Method	Endpoint	Description	Auth
GET	/users	List users (tenant-scoped)	Yes
POST	/users	Create user (tenant-scoped)	Yes
GET	/users/:id	Get user (tenant-scoped)	Yes
PUT	/users/:id	Update user (tenant-scoped)	Yes
DELETE	/users/:id	Delete user (tenant-scoped)	Yes
Roles
Method	Endpoint	Description	Auth
GET	/roles	List roles	Yes
POST	/roles	Create role	Yes
GET	/roles/:id	Get role	Yes
Notes

All tenant-scoped operations must enforce tenant_id from the authenticated context.

RBAC enforcement uses roles, permissions, and role_permissions.

Audit logs should be written for security-relevant actions (auth events, user changes, tenant changes).