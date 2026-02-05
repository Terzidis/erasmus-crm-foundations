# ARCHITECTURE (Phase 1)

## Goal
Create a stable, secure, and extensible CRM foundation that supports:
- Multi-tenancy (tenant isolation)
- JWT authentication + refresh tokens (sessions)
- RBAC (roles + permissions)
- Audit logging
- Documented REST API (OpenAPI/Swagger)
- Base frontend pages for authentication and navigation

---

## Technology Stack
- **Frontend:** React (Vite) deployed on **Vercel**
- **Backend:** NestJS (TypeScript) REST API deployed on **Railway**
- **Database:** PostgreSQL deployed on **Railway**
- **ORM & Migrations:** TypeORM migrations
- **Auth:** JWT access tokens + refresh tokens, bcrypt hashing
- **RBAC:** roles + permissions tables
- **API Docs:** Swagger/OpenAPI at `/api/docs` (development)

---

## High-level Architecture
```mermaid
flowchart LR
  U["User Browser"]
  FE["Frontend - Vercel"]
  API["Backend API - Railway"]
  DB["PostgreSQL Database"]
  AL["Audit Logs"]

  U --> FE
  FE --> API
  API --> DB
  API --> AL
  
---

### Multi-tenant flow
```mermaid
flowchart TB
  FE["Frontend"]
  API["API"]
  TC["Tenant Context"]
  S["Services"]
  DB["PostgreSQL"]

  FE --> API
  API --> TC
  TC --> S
  S --> DB
