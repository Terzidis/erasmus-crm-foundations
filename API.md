# API (Phase 1)

## Base URLs
- Local API: `http://localhost:3000/api`
- Local Swagger: `http://localhost:3000/docs`
- Production API: `https://<RAILWAY_API_DOMAIN>/api`
- Production Swagger: `https://<RAILWAY_API_DOMAIN>/docs` (if enabled)

> Source of truth: Swagger UI.

---

## Authentication (JWT + Refresh)
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/auth/register` | User registration (skeleton) | No |
| POST | `/auth/login` | Login (returns access + refresh tokens) | No |
| POST | `/auth/refresh` | Refresh access token | No* |
| POST | `/auth/logout` | Logout (skeleton, session revoke later) | Yes |
| GET | `/auth/me` | Current user info from JWT | Yes |

\* Requires refresh token in body.

---

## Tenants (Admin)
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/tenants` | List tenants (Admin only) | Yes (Admin) |
| POST | `/tenants` | Create tenant (Admin only) | Yes (Admin) |
| GET | `/tenants/:id` | Get tenant by id (Admin only) | Yes (Admin) |
| PUT | `/tenants/:id` | Update tenant (Admin only) | Yes (Admin) |

---

## Users
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/users` | List users (tenant-scoped, skeleton) | Yes |
| POST | `/users` | Create user (tenant-scoped, skeleton) | Yes |
| GET | `/users/:id` | Get user by id (skeleton) | Yes |
| PUT | `/users/:id` | Update user (skeleton) | Yes |
| DELETE | `/users/:id` | Delete user (skeleton) | Yes |

---

## Roles
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/roles` | List roles (skeleton) | Yes |
| POST | `/roles` | Create role (skeleton) | Yes |
| GET | `/roles/:id` | Get role by id (skeleton) | Yes |

### Role Permissions (role_permissions)
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/roles/:id/permissions` | List permissions assigned to role (skeleton) | Yes |
| POST | `/roles/:id/permissions` | Assign permission to role (skeleton) | Yes |
| DELETE | `/roles/:id/permissions/:permissionId` | Remove permission from role (skeleton) | Yes |

---

## Permissions
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/permissions` | List permissions (skeleton) | Yes |

---

## Audit Logs
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/audit-logs` | List audit logs (skeleton) | Yes |

---

## System
| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/health` | Health check | No |
| GET | `/info` | Application info | No |

---

## Notes (Phase 1)
- Current implementation is **foundation + skeleton endpoints** for Phase 1 deliverables.
- Multi-tenant enforcement, full RBAC permission checks, session persistence, and audit write hooks are implemented in later phases.
