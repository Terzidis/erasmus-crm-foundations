
---

```md
# ARCHITECTURE (Phase 1)

## Goal
Build a stable, secure, and extensible **CRM foundation** that supports:
- Multi-tenancy (tenant isolation)
- JWT authentication + refresh tokens
- RBAC (roles + permissions)
- Audit logging
- Documented REST API (OpenAPI/Swagger)
- Base frontend for login/register/dashboard

---

## Technology stack
- **Backend:** NestJS (TypeScript), REST API
- **Database:** PostgreSQL
- **ORM/Migrations:** TypeORM migrations
- **Auth:** JWT access tokens + refresh tokens, bcrypt hashing
- **RBAC:** roles + permissions tables
- **Docs:** Swagger/OpenAPI at `/api/docs` (dev)
- **Deployment:** Railway (API + DB), Vercel (frontend)

---

## High-level architecture diagram

```mermaid
flowchart LR
  U[User Browser] --> FE[Frontend (Vercel)]
  FE -->|HTTPS REST + JWT| API[Backend API (Railway)]
  API --> DB[(PostgreSQL - Railway)]
  API --> AUDIT[(audit_logs)]
