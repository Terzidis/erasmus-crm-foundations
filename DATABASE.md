
---

## 2) DATABASE.md (copy-paste template + schema)
Φτιάξε `DATABASE.md` στο root και βάλε

```md
# DATABASE (Phase 1)

## Engine
PostgreSQL

## Multi-tenant strategy
- Single database, single schema
- Row-level separation using `tenant_id` foreign key in all tables
- Tenant context comes from JWT (`tenant_id`)
- All queries are tenant-scoped

 (Optional hardening) Enable Postgres RLS later.

## Tables

### tenants
Stores shopping center  tenant information.
Columns
- id (uuid, PK)
- name (varchar, unique)
- created_at, updated_at

Indexes
- unique(name)

### users
System users belonging to a tenant.
Columns
- id (uuid, PK)
- tenant_id (uuid, FK - tenants.id)
- email (varchar, unique per tenant)
- password_hash (varchar)
- role_id (uuid, FK - roles.id)
- is_active (bool)
- created_at, updated_at

Indexes
- unique(tenant_id, email)
- index(tenant_id)

### roles
Available roles (Admin, Manager, Operator) per tenant (or global).
Columns
- id (uuid, PK)
- tenant_id (uuid, nullable if global)
- name (varchar)
- created_at, updated_at

Indexes
- unique(tenant_id, name)

### permissions
System permissions (global list).
Columns
- id (uuid, PK)
- code (varchar unique) e.g. users.read
- description

Index
- unique(code)

### role_permissions
Many-to-many mapping.
Columns
- role_id (uuid, FK - roles.id)
- permission_id (uuid, FK - permissions.id)

PK
- (role_id, permission_id)

Indexes
- index(permission_id)

### sessions
Refresh token  session tracking.
Columns
- id (uuid, PK)
- user_id (uuid, FK - users.id)
- tenant_id (uuid, FK - tenants.id)
- refresh_token_hash (varchar)
- revoked_at (timestamp nullable)
- expires_at (timestamp)
- created_at

Indexes
- index(user_id)
- index(tenant_id)
- index(expires_at)

### audit_logs
Securityaudit trail.
Columns
- id (uuid, PK)
- tenant_id (uuid, FK - tenants.id)
- user_id (uuid, nullable FK - users.id)
- action (varchar) e.g. users.create
- resource (varchar) e.g. users
- resource_id (uuid nullable)
- ip (varchar nullable)
- user_agent (text nullable)
- metadata (jsonb nullable)
- created_at

Indexes
- index(tenant_id, created_at)
- index(user_id)

## ER diagram
```mermaid
erDiagram
  TENANTS --o{ USERS  has
  TENANTS --o{ ROLES  has
  ROLES --o{ USERS  assigns
  ROLES --o{ ROLE_PERMISSIONS  has
  PERMISSIONS --o{ ROLE_PERMISSIONS  maps
  USERS --o{ SESSIONS  has
  TENANTS --o{ SESSIONS  has
  TENANTS --o{ AUDIT_LOGS  has
  USERS --o{ AUDIT_LOGS  writes

  TENANTS {
    uuid id PK
    varchar name
    timestamptz created_at
    timestamptz updated_at
  }
  USERS {
    uuid id PK
    uuid tenant_id FK
    varchar email
    varchar password_hash
    uuid role_id FK
    bool is_active
    timestamptz created_at
    timestamptz updated_at
  }
  ROLES {
    uuid id PK
    uuid tenant_id
    varchar name
    timestamptz created_at
    timestamptz updated_at
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
    uuid user_id FK
    uuid tenant_id FK
    varchar refresh_token_hash
    timestamptz revoked_at
    timestamptz expires_at
    timestamptz created_at
  }
  AUDIT_LOGS {
    uuid id PK
    uuid tenant_id FK
    uuid user_id FK
    varchar action
    varchar resource
    uuid resource_id
    jsonb metadata
    timestamptz created_at
  }
