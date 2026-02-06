```md
# ARCHITECTURE (Phase 1)

## Goal

Create a **stable, secure, and extensible CRM foundation** that supports:

- Multi-tenancy (tenant isolation)
- JWT authentication with refresh tokens
- Role-Based Access Control (RBAC)
- Audit logging
- Documented REST API (OpenAPI / Swagger)
- Base frontend scaffolding

---

## Technology Stack

- **Frontend:** React + Vite (Vercel)
- **Backend:** NestJS (TypeScript) (Railway)
- **Database:** PostgreSQL (Railway)
- **ORM:** TypeORM with migrations
- **Auth:** JWT access & refresh tokens, bcrypt
- **Authorization:** RBAC (roles + permissions)
- **API Docs:** Swagger (`/docs`)

---

## High-level Architecture

```mermaid
flowchart LR
  U[User Browser] --> FE[Frontend]
  FE --> API[Backend API]
  API --> DB[(PostgreSQL)]
  API --> DOCS[Swagger UI]
Multi-tenant Architecture
Strategy
Single database

Single schema

Row-level isolation using tenant_id

Tenant context resolved from JWT claims

All tenant-scoped queries are filtered by tenant_id.

mermaid
Αντιγραφή κώδικα
flowchart TB
  FE[Frontend] --> API[API]
  API --> JWT[JWT tenant_id]
  API --> SVC[Services]
  SVC --> DB[(PostgreSQL)]
Authentication Flow
JWT access token for API requests

Refresh token for session renewal

Tokens validated by guards

User identity & tenant resolved per request

mermaid
Αντιγραφή κώδικα
sequenceDiagram
  participant U as User
  participant FE as Frontend
  participant API as API
  participant DB as Postgres

  U->>FE: Login
  FE->>API: POST /api/auth/login
  API->>DB: Verify credentials
  API-->>FE: access_token + refresh_token
  FE->>API: GET /api/auth/me
  API-->>FE: user info
RBAC (Roles & Permissions)
Roles: ADMIN, MANAGER, OPERATOR

Permissions expressed as action codes (e.g. users.read)

Many-to-many mapping via role_permissions

Guards enforce authorization at route level

Audit Logging
Critical actions recorded in audit_logs

Includes:

tenant_id

user_id

action

metadata

timestamp

Enables traceability and security review

Architectural Decisions
NestJS chosen for modularity and long-term scalability

PostgreSQL selected for relational integrity and extensibility

Migrations used in production (synchronize = false)

JWT for stateless authentication

Refresh tokens allow secure session renewal

RBAC decouples authorization logic from business logic

Audit logs ensure accountability

Deployment Overview
Frontend: Vercel

Backend: Railway

Database: Railway PostgreSQL

TLS/HTTPS: platform-managed

Secrets: environment variables (platform-managed)

Phase 1 Scope
Phase 1 focuses strictly on foundation:

Architecture

Security model

Database schema

API skeleton

Documentation

Business logic and UI polish are implemented in later phases.