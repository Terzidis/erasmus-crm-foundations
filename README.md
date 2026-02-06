# Erasmus CRM Foundation

This repository provides the **foundation of the Erasmus CRM system**.
Phase 1 focuses on backend architecture, authentication, RBAC, multi-tenancy,
database schema, and documentation.

---

## Tech Stack

**Backend**
- NestJS (TypeScript)
- TypeORM (migrations, no synchronize)
- JWT authentication (access + refresh tokens)
- RBAC (roles & permissions)
- PostgreSQL

**Frontend**
- React + Vite (base skeleton)
- Deployed on Vercel (Phase 2 expansion)

**Infrastructure**
- Railway (API + PostgreSQL)
- Vercel (Frontend)
- pnpm monorepo workspace

---

## Project Structure

```text
apps/
 ├─ api/        # NestJS backend
 └─ web/        # React frontend (base)
Production URLs
Backend API (Railway)
Base URL
👉 https://api-production-2bd8.up.railway.app

Health Check
👉 https://api-production-2bd8.up.railway.app/api/health

Application Info
👉 https://api-production-2bd8.up.railway.app/api/info

Swagger / OpenAPI Docs
👉 https://api-production-2bd8.up.railway.app/docs

Features (Phase 1)
Architecture
Multi-tenant architecture (row-level isolation via tenant_id)

Modular NestJS structure

Production-safe configuration (no auto-sync)

Authentication & Security
User registration

JWT login

Refresh tokens with session tracking

Logout / token revocation

Password hashing with bcrypt

Role-Based Access Control (RBAC)

Permission validation

Audit logging

Database
PostgreSQL

Fully migrated schema (TypeORM migrations)

Indexed tenant-scoped tables

Referential integrity

Ready for RLS hardening (optional)

API
REST API

Swagger documentation

Validation pipes

Error handling

Health & info endpoints

Implemented API Modules (Skeleton)
Auth

Tenants

Users

Roles

Permissions

Audit Logs

All endpoints are visible and testable via Swagger.

Local Development
Requirements
Node.js (LTS)

pnpm

PostgreSQL

Install

pnpm install
Run API
bash

pnpm --filter api start:dev
API runs on:

http://localhost:3000
Swagger:


http://localhost:3000/docs
Documentation
ARCHITECTURE.md – system architecture & design

DATABASE.md – database schema & ER diagram

API.md – API endpoints

.env.example – environment variables template

Phase 1 Scope
Phase 1 delivers:

Stable backend foundation

Secure authentication model

RBAC authorization

Multi-tenant database schema

Full technical documentation

Business logic, advanced UI/UX, and CRM workflows
are implemented in later phases.