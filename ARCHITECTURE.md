# ARCHITECTURE (Phase 1)

## Overview
Phase 1 delivers a secure, scalable CRM foundation with:
- NestJS REST API (TypeScript)
- PostgreSQL (cloud)
- TypeORM + migrations
- JWT authentication + refresh tokens
- RBAC (roles + permissions)
- Audit logs + sessions
- Base frontend (login/register/dashboard)

---

## High-level Architecture Diagram

```mermaid
flowchart LR
  U[User Browser] --> FE[Frontend (Vercel)]
  FE -->|HTTPS REST + JWT| API[Backend API (Railway / Cloud Run)]
  API --> DB[(PostgreSQL)]
  API --> AUDIT[(audit_logs)]

flowchart TB
  subgraph TenantContext["Tenant Context (JWT)"]
    JWT[Access Token: sub + role + tenant_id]
  end

  subgraph API["NestJS API"]
    Guard[JWT Guard + RBAC Guard]
    TenantScope[Tenant Scoping (tenant_id filter)]
    Services[Services/Repositories]
  end

  JWT --> Guard --> TenantScope --> Services --> DB[(PostgreSQL)]

  DB -->|Row-level separation via tenant_id| DB

sequenceDiagram
  participant U as User
  participant FE as Frontend
  participant API as API
  participant DB as Postgres

  U->>FE: Login (email/password)
  FE->>API: POST /auth/login
  API->>DB: Verify user + passwordHash
  API-->>FE: access_token + refresh_token
  FE->>API: GET /auth/me (Authorization: Bearer)
  API-->>FE: current user info
  FE->>API: POST /auth/refresh (refresh token)
  API-->>FE: new access_token
  FE->>API: POST /auth/logout
  API->>DB: revoke session/refresh
  API-->>FE: 204
