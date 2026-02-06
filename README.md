# Erasmus CRM Foundation (Phase 1)

This repository provides the **foundation layer** for the Erasmus CRM system.
Phase 1 focuses on architecture, database schema, authentication model, RBAC,
and API skeletons — not full business logic or final UI.

---

## Tech Stack

### Backend
- NestJS (TypeScript)
- TypeORM (migrations)
- JWT authentication (access + refresh)
- RBAC (roles + permissions)
- Swagger / OpenAPI

### Frontend
- React
- Vite

### Database
- PostgreSQL

### Tooling & Infra
- Monorepo: pnpm workspace
- Deployment:
  - API + DB: Railway
  - Frontend: Vercel

---

## Project Structure

apps/
├─ api/ → NestJS backend
└─ web/ → React frontend

yaml
Αντιγραφή κώδικα

---

## Core Domain (Phase 1)

- Tenant
- User
- Role
- Permission
- Session
- AuditLog

> Business entities (Companies, Deals, etc.) are added in later phases.

---

## Local Development

### Requirements
- Node.js (LTS)
- pnpm
- PostgreSQL
- pgAdmin (optional)

---

### Install Dependencies
From project root:

```bash
pnpm install
Run Backend (API)
bash
Αντιγραφή κώδικα
cd apps/api
pnpm start:dev
API runs at:

http://localhost:3000/api

Swagger:

http://localhost:3000/docs

Health:

http://localhost:3000/api/health

Run Frontend (Web)
bash
Αντιγραφή κώδικα
cd apps/web
pnpm dev
Frontend:

http://localhost:5173

Environment Variables (API)
Example (apps/api/.env):

env
Αντιγραφή κώδικα
DATABASE_URL=postgresql://...

JWT_ACCESS_SECRET=change_me
JWT_REFRESH_SECRET=change_me

JWT_ACCESS_TTL=900
JWT_REFRESH_TTL=604800

CORS_ORIGIN=http://localhost:5173
PORT=3000
Documentation
ARCHITECTURE.md – system architecture & decisions

DATABASE.md – database schema & ER diagram

API.md – REST endpoints overview (Swagger is source of truth)

Phase 1 Scope
Phase 1 delivers:

Architecture & design

Database schema + migrations

Authentication & RBAC model

API skeleton endpoints

Documentation

UI/UX and business-specific workflows are implemented in later phases.