# Erasmus CRM Foundation

This project provides the foundation for an Erasmus CRM system.
It includes backend API, frontend web app, and database schema with migrations.

## Tech Stack
- Backend: NestJS (TypeScript)
- Frontend: React + Vite
- Database: PostgreSQL
- ORM: TypeORM (with migrations)
- Monorepo: pnpm workspace
- Deployment: Railway (API + DB), Vercel (Frontend)

---

## Project Structure

apps/
api/ -> NestJS backend
web/ -> React frontend

Core entities:
- User
- Company
- Contact
- Deal
- Activity

---

## Quickstart (Local)

### Requirements
- Node.js (LTS)
- pnpm
- PostgreSQL
- pgAdmin (optional)

---

### 1) Install dependencies
From project root:

```bash
pnpm install