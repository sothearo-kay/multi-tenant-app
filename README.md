# Multi-Tenant Nuxt Application

A multi-tenant SaaS application built with Nuxt 3, designed to serve multiple tenants from a single codebase with tenant isolation and customization capabilities.

## 🏗️ System Architecture

### High-Level Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        A[Client Browser]
        B[Mobile App]
    end
    
    subgraph "Edge/CDN"
        C[Cloudflare/Vercel Edge]
        D[Static Assets]
    end
    
    subgraph "Application Layer"
        E[Nuxt 3 Application]
        F[Tenant Middleware]
        G[Auth Middleware]
        H[API Routes]
    end
    
    subgraph "Caching Layer"
        I[Upstash Redis]
        J[Session Store]
        K[Config Cache]
        L[Rate Limiting]
    end
    
    subgraph "Data Layer"
        M[PostgreSQL/MySQL]
        N[Tenant Data]
        O[User Data]
        P[Config Data]
    end
    
    A --> C
    B --> C
    C --> E
    E --> F
    F --> G
    G --> H
    H --> I
    H --> M
    I --> J
    I --> K
    I --> L
    M --> N
    M --> O
    M --> P
```

### Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant N as Nuxt App
    participant M as Auth Middleware
    participant R as Redis Cache
    participant DB as Database
    
    U->>N: Access tenant.domain.com/login
    N->>M: Resolve tenant from subdomain
    M->>R: Check tenant cache
    alt Tenant cached
        R-->>M: Return tenant config
    else Not cached
        M->>DB: Query tenant data
        DB-->>M: Return tenant info
        M->>R: Cache tenant config
    end
    
    U->>N: Submit login credentials
    N->>DB: Validate user credentials
    DB-->>N: Return user data
    N->>R: Create session
    N-->>U: Return JWT + Set session cookie
    
    U->>N: Subsequent requests
    N->>M: Validate session
    M->>R: Check session validity
    R-->>M: Return session data
    M-->>N: Allow access
```

### Multi-Tenant Data Architecture

```mermaid
erDiagram
    TENANTS ||--o{ USERS : has
    TENANTS ||--o{ TENANT_CONFIGS : has
    USERS ||--o{ USER_SESSIONS : has
    TENANTS ||--o{ AUDIT_LOGS : generates
    
    TENANTS {
        uuid id PK
        string slug UK "subdomain identifier"
        string name
        string domain "custom domain"
        enum status "active|inactive|suspended"
        jsonb settings
        timestamp created_at
        timestamp updated_at
    }
    
    USERS {
        uuid id PK
        uuid tenant_id FK
        string email UK
        string password_hash
        string first_name
        string last_name
        enum role "admin|user|viewer"
        enum status "active|inactive"
        timestamp last_login_at
        timestamp created_at
        timestamp updated_at
    }
    
    TENANT_CONFIGS {
        uuid id PK
        uuid tenant_id FK
        jsonb branding
        jsonb features
        jsonb security
        jsonb integrations
        timestamp updated_at
    }
    
    USER_SESSIONS {
        uuid id PK
        uuid user_id FK
        uuid tenant_id FK
        string session_token
        jsonb metadata
        timestamp expires_at
        timestamp created_at
    }
    
    AUDIT_LOGS {
        uuid id PK
        uuid tenant_id FK
        uuid user_id FK
        string action
        jsonb metadata
        string ip_address
        string user_agent
        timestamp created_at
    }
```

### Redis Caching Strategy

```mermaid
graph TD
    subgraph "Redis Caching Layers"
        A[Session Cache]
        B[Tenant Config Cache]
        C[Rate Limiting]
        D[User Auth Cache]
    end
    
    subgraph "Cache Keys & TTL"
        A --> A1["session:{tenantId}:{userId}<br/>TTL: 24h"]
        B --> B1["config:{tenantId}<br/>TTL: 1h"]
        C --> C1["rate:{ip}:{endpoint}<br/>TTL: 15min"]
        D --> D1["auth:{tenantId}:{email}<br/>TTL: 5min"]
    end
    
    subgraph "Cache Invalidation"
        E[Config Updates] --> B
        F[User Logout] --> A
        G[Security Events] --> D
        H[Admin Actions] --> B
    end
```

### API Architecture

```mermaid
graph LR
    subgraph "API Endpoints"
        A[Auth APIs]
        B[Tenant APIs]
        C[User APIs]
        D[Config APIs]
    end
    
    subgraph "Middleware Stack"
        E[Tenant Resolution]
        F[Rate Limiting]
        G[CORS Protection]
        H[Input Validation]
        I[Authentication]
        J[Authorization]
        K[Audit Logging]
    end
    
    A --> E
    B --> E
    C --> E
    D --> E
    
    E --> F
    F --> G
    G --> H
    H --> I
    I --> J
    J --> K
```

## Features

- **🏢 Tenant Isolation**: Secure data separation between tenants
- **🌐 Custom Domains**: Support for custom tenant domains
- **🎨 Tenant-Specific Theming**: Customizable branding per tenant
- **🔐 Role-Based Access Control**: Granular permissions system
- **⚡ Redis Caching**: High-performance caching with Upstash
- **🔒 Security Hardened**: Rate limiting, input validation, audit logging
- **📊 Scalable Architecture**: Built for performance and growth

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more about the underlying framework.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## 🗄️ Database Schema

The application uses a multi-tenant database architecture with tenant isolation:

```sql
-- Core tenant table
CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    domain VARCHAR(255),
    status VARCHAR(20) DEFAULT 'active',
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Tenant users with role-based access
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(20) DEFAULT 'user',
    status VARCHAR(20) DEFAULT 'active',
    last_login_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(tenant_id, email)
);

-- Tenant-specific configurations
CREATE TABLE tenant_configs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    branding JSONB DEFAULT '{}',
    features JSONB DEFAULT '{}',
    security JSONB DEFAULT '{}',
    integrations JSONB DEFAULT '{}',
    updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🔧 Environment Configuration

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/multitenant"

# Redis (Upstash)
UPSTASH_REDIS_REST_URL="https://your-redis.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your-token"

# Authentication
JWT_SECRET="your-jwt-secret-key"
JWT_EXPIRES_IN="24h"
REFRESH_TOKEN_EXPIRES_IN="7d"

# Application
NUXT_APP_DOMAIN="yourdomain.com"
NUXT_APP_BASE_URL="https://yourdomain.com"

# Security
BCRYPT_ROUNDS=12
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=60000
```

## 🔐 Security Features

### Authentication & Authorization
- **JWT-based authentication** with refresh tokens
- **Role-based access control** (Admin, User, Viewer)
- **Session management** with Redis storage
- **Password policies** with complexity requirements

### Security Middleware
- **Rate limiting** to prevent abuse
- **CORS protection** for cross-origin requests
- **Input validation** and sanitization
- **SQL injection prevention** with parameterized queries
- **XSS protection** for user inputs

### Audit & Compliance
- **Security event logging** for all authentication events
- **GDPR compliance** with data export/deletion
- **IP-based access controls** (optional)
- **Session timeout** and automatic cleanup

## 🚀 Deployment Architecture

```mermaid
graph TB
    subgraph "Production Environment"
        A[Load Balancer]
        B[App Instance 1]
        C[App Instance 2]
        D[App Instance N]
    end
    
    subgraph "Data Services"
        E[PostgreSQL Primary]
        F[PostgreSQL Replica]
        G[Upstash Redis]
    end
    
    subgraph "Monitoring"
        H[Application Logs]
        I[Performance Metrics]
        J[Security Alerts]
    end
    
    A --> B
    A --> C
    A --> D
    B --> E
    C --> E
    D --> E
    E --> F
    B --> G
    C --> G
    D --> G
    B --> H
    C --> I
    D --> J
```

## 📚 API Documentation

### Authentication Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | Register new user |
| `/api/auth/login` | POST | User login |
| `/api/auth/logout` | POST | User logout |
| `/api/auth/refresh` | POST | Refresh JWT token |
| `/api/auth/me` | GET | Get current user |

### Tenant Management

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/tenant/config` | GET | Get tenant configuration |
| `/api/tenant/config` | PUT | Update tenant configuration |
| `/api/tenant/users` | GET | List tenant users |
| `/api/tenant/users/invite` | POST | Invite new user |

## 🧪 Testing Strategy

```mermaid
graph LR
    A[Unit Tests] --> B[Integration Tests]
    B --> C[E2E Tests]
    C --> D[Load Tests]
    
    A1[Components] --> A
    A2[Utils] --> A
    A3[Services] --> A
    
    B1[API Routes] --> B
    B2[Database] --> B
    B3[Redis] --> B
    
    C1[User Flows] --> C
    C2[Auth Flows] --> C
    C3[Tenant Isolation] --> C
    
    D1[Performance] --> D
    D2[Scalability] --> D
    D3[Concurrent Users] --> D
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
