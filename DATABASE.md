# DATABASE (Phase 1)

## Engine
PostgreSQL (Railway – managed)

## Multi-tenant strategy
We use a **single database + single schema** and enforce multi-tenancy by **row-level separation**:
- Every tenant-scoped table contains a `tenant_id` (FK -> `tenants.id`).
- The application extracts `tenant_id` from the JWT claims and enforces tenant-scoped queries.
- Admin operations can list/manage multiple tenants, while tenant users can only access rows belonging to their tenant.

> Optional hardening (future): enable Postgres RLS policies to enforce tenant isolation at the DB level.

---

## Tables

### 1) tenants
**Purpose:** Stores tenant / shopping center information.

**Columns**
- `id` (uuid, PK)
- `name` (varchar, unique)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

**Constraints**
- Unique: `name`

**Indexes**
- Unique index on `name`

---

### 2) roles
**Purpose:** Available roles such as Admin, Manager, Operator. Roles are tenant-scoped.

**Columns**
- `id` (uuid, PK)
- `tenant_id` (uuid, FK -> tenants.id)
- `name` (varchar)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

**Constraints**
- FK: `tenant_id` -> `tenants.id`
- Unique per tenant: `(tenant_id, name)`

**Indexes**
- `tenant_id`
- Unique `(tenant_id, name)`

---

### 3) permissions
**Purpose:** Global list of permissions (RBAC). Example codes: `users.read`, `users.create`.

**Columns**
- `id` (uuid, PK)
- `code` (varchar, unique)
- `description` (varchar)

**Constraints**
- Unique: `code`

**Indexes**
- Unique on `code`

---

### 4) role_permissions
**Purpose:** Many-to-many mapping between `roles` and `permissions`.

**Columns**
- `role_id` (uuid, FK -> roles.id)
- `permission_id` (uuid, FK -> permissions.id)

**Constraints**
- Composite PK: `(role_id, permission_id)`
- FK: `role_id` -> roles.id (ON DELETE CASCADE)
- FK: `permission_id` -> permissions.id (ON DELETE CASCADE)

**Indexes**
- `permission_id` (for reverse lookups)

---

### 5) users
**Purpose:** System users belonging to a tenant, assigned to a role.

**Columns**
- `id` (uuid, PK)
- `tenant_id` (uuid, FK -> tenants.id)
- `email` (varchar)
- `passwordHash` (varchar)
- `role_id` (uuid, FK -> roles.id)
- `isActive` (boolean, default true)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

**Constraints**
- FK: `tenant_id` -> `tenants.id`
- FK: `role_id` -> `roles.id`
- Unique per tenant: `(tenant_id, email)`

**Indexes**
- `tenant_id`
- Unique `(tenant_id, email)`
- `role_id`

**Security**
- Passwords are never stored in plaintext, only in `passwordHash` (bcrypt).

---

### 6) sessions
**Purpose:** Refresh token / session tracking (revocable sessions).

**Columns**
- `id` (uuid, PK)
- `tenant_id` (uuid, FK -> tenants.id)
- `user_id` (uuid, FK -> users.id)
- `refreshTokenHash` (varchar)
- `revokedAt` (timestamp, nullable)
- `expiresAt` (timestamp)
- `createdAt` (timestamp)

**Constraints**
- FK: `tenant_id` -> `tenants.id`
- FK: `user_id` -> `users.id`

**Indexes**
- `tenant_id`
- `user_id`
- `expiresAt` (for cleanup / expiry checks)

**Security**
- Refresh tokens are stored as hashes (never plaintext).
- Logout revokes session by setting `revokedAt`.

---

### 7) audit_logs
**Purpose:** Security audit trail (who did what, when).

**Columns**
- `id` (uuid, PK)
- `tenant_id` (uuid, FK -> tenants.id)
- `user_id` (uuid, FK -> users.id, nullable)
- `action` (varchar) e.g. `users.create`
- `resource` (varchar) e.g. `users`
- `resourceId` (uuid, nullable)
- `ip` (varchar, nullable)
- `userAgent` (text, nullable)
- `metadata` (jsonb, nullable)
- `createdAt` (timestamp)

**Constraints**
- FK: `tenant_id` -> `tenants.id`
- FK: `user_id` -> `users.id` (nullable for system events)

**Indexes**
- `(tenant_id, createdAt)` (fast tenant audit filtering)
- `user_id`

---

## ER Diagram

```mermaid
erDiagram
  TENANTS ||--o{ USERS : has
  TENANTS ||--o{ ROLES : has
  ROLES ||--o{ USERS : assigns
  ROLES ||--o{ ROLE_PERMISSIONS : has
  PERMISSIONS ||--o{ ROLE_PERMISSIONS : maps
  USERS ||--o{ SESSIONS : has
  TENANTS ||--o{ SESSIONS : has
  TENANTS ||--o{ AUDIT_LOGS : has
  USERS ||--o{ AUDIT_LOGS : writes

  TENANTS {
    uuid id PK
    varchar name
    timestamptz createdAt
    timestamptz updatedAt
  }

  USERS {
    uuid id PK
    uuid tenant_id FK
    varchar email
    varchar passwordHash
    uuid role_id FK
    bool isActive
    timestamptz createdAt
    timestamptz updatedAt
  }

  ROLES {
    uuid id PK
    uuid tenant_id FK
    varchar name
    timestamptz createdAt
    timestamptz updatedAt
  }

  PERMISSIONS {
    uuid id PK
    varchar code
    varchar description
  }

  ROLE_PERMISSIONS {
    uuid role_id FK
    uuid permission_id FK
  }

  SESSIONS {
    uuid id PK
    uuid tenant_id FK
    uuid user_id FK
    varchar refreshTokenHash
    timestamptz revokedAt
    timestamptz expiresAt
    timestamptz createdAt
  }

  AUDIT_LOGS {
    uuid id PK
    uuid tenant_id FK
    uuid user_id FK
    varchar action
    varchar resource
    uuid resourceId
    jsonb metadata
    timestamptz createdAt
  }
