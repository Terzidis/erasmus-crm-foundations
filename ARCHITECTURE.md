# ARCHITECTURE (Phase 1)

## Goal
Create a stable, secure, and extensible CRM foundation that supports:
- Multi-tenancy (tenant isolation)
- JWT authentication with refresh tokens
- Role-Based Access Control (RBAC)
- Audit logging
- Documented REST API (OpenAPI / Swagger)
- Base frontend for authentication and navigation

---

## Technology Stack

- **Frontend:** React (Vite) deployed on Vercel
- **Backend:** NestJS (TypeScript) REST API deployed on Railway
- **Database:** PostgreSQL deployed on Railway
- **ORM:** TypeORM with migrations
- **Authentication:** JWT access tokens + refresh tokens, bcrypt
- **Authorization:** RBAC (roles + permissions)
- **API Documentation:** Swagger / OpenAPI at `/api/docs`

---

## High-level Architecture

```mermaid
flowchart LR
  U["User Browser"]
  FE["Frontend (Vercel)"]
  API["Backend API (Railway)"]
  DB["PostgreSQL Database"]
  AL["Audit Logs"]

  U --> FE
  FE --> API
  API --> DB
  API --> AL

flowchart TB
  FE["Frontend"]
  API["API Layer"]
  CTX["Tenant Context (tenant_id from JWT)"]
  SVC["Services & Repositories"]
  DB["PostgreSQL"]

  FE --> API
  API --> CTX
  CTX --> SVC
  SVC --> DB

sequenceDiagram
  participant U as User
  participant FE as Frontend
  participant API as API
  participant DB as PostgreSQL

  U->>FE: Login (email + password)
  FE->>API: POST /auth/login
  API->>DB: Validate user & password hash
  API-->>FE: access_token + refresh_token
  FE->>API: GET /auth/me (Bearer token)
  API-->>FE: Current user info
  FE->>API: POST /auth/refresh
  API-->>FE: New access token
  FE->>API: POST /auth/logout
  API->>DB: Revoke session
