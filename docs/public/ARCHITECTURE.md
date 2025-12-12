# CyberShield - Arquitectura de Proyecto

## 🏗️ Visión General

El proyecto CyberShield está organizado usando una **arquitectura basada en features** que proporciona:
- 📦 Modularidad: Cada feature es independiente
- 🎯 Claridad: Fácil encontrar código relacionado
- 🚀 Escalabilidad: Agregar features sin desorden
- 🧪 Testabilidad: Componentes aislados

---

## 📂 Estructura del Proyecto

```
src/
├── config/              # Configuración global de la app
├── database/            # Capa de datos (ORM + esquema)
├── features/            # Features por dominio
├── shared/              # Código compartido
└── types/               # Tipos TypeScript globales
```

### `/src/config` - Configuración
Configuraciones globales y constantes:
- `auth.ts` - Integración con Clerk
- `database.ts` - Conexión a PostgreSQL
- `security.ts` - Políticas de seguridad
- `constants.ts` - Constantes de aplicación

### `/src/database` - Capa de Datos
Gestión de datos con Drizzle ORM:
- `schema.ts` - Modelos de BD (usuarios, proyectos, etc)
- `migrations/` - Scripts de migración SQL
- `seeds/` - Datos iniciales
- `queries.ts` - Queries reutilizables

### `/src/features` - Features
Cada característica es un módulo independiente:

#### Auth Feature
```
features/auth/
├── actions/          # Server actions de Clerk
├── components/       # Componentes de login/signup
├── hooks/            # Hooks de autenticación
├── types.ts          # Tipos de auth
└── README.md         # Documentación
```

#### Newsletter Feature
```
features/newsletter/
├── actions/          # Subscribe/unsubscribe
├── components/       # Formulario newsletter
├── hooks/            # Custom hooks
├── types.ts
└── README.md
```

#### Admin Feature
```
features/admin/
├── actions/          # Gestión de usuarios/proyectos
├── components/       # Paneles admin
├── hooks/            # Admin-specific hooks
├── types.ts
└── README.md
```

#### Projects Feature
```
features/projects/
├── actions/          # CRUD de proyectos
├── components/       # Showcase de proyectos
├── hooks/
├── types.ts
└── README.md
```

#### Blog Feature
```
features/blog/
├── actions/          # CRUD de posts
├── components/       # Blog components
├── hooks/
├── types.ts
└── README.md
```

### `/src/shared` - Código Compartido
Reutilizable en toda la aplicación:
- `components/` - Componentes globales (UI + custom)
- `hooks/` - Hooks reutilizables
- `utils/` - Funciones auxiliares
- `types/` - Tipos compartidos
- `constants/` - Constantes globales

### `/src/types` - Tipos TypeScript
Definiciones de tipos globales:
- `database.ts` - Tipos basados en BD
- `api.ts` - Tipos de respuestas API
- `common.ts` - Tipos comunes
- `index.ts` - Re-exports

---

## 🔄 Flujo de Datos

```
Client Request
     ↓
Next.js Route (app/)
     ↓
Server Action (@features/*/actions)
     ↓
Database Query (@database/queries)
     ↓
Drizzle ORM (@database/schema)
     ↓
PostgreSQL (Neon)
     ↓
Response
```

---

## 🔐 Seguridad

### Autenticación
- **Clerk**: OAuth + Social login (Google)
- **Middleware**: Protege rutas `/admin`, `/resources`, `/projects`
- **Rate Limiting**: 100 req/min general, 30 req/min para API

### Autorización
- **Role-Based Access**: admin, user, visitor
- **Server Actions**: Validadas en backend
- **Input Sanitization**: Validación en newsletter

### Base de Datos
- **PostgreSQL**: SSL encryption en tránsito
- **Neon**: Hosted PostgreSQL con backups
- **Drizzle ORM**: Queries parametrizadas (protección contra SQL injection)

---

## 🚀 Stack Técnico

| Layer | Tecnología |
|-------|-----------|
| **Frontend** | React 19 + Next.js 16 |
| **Styling** | Tailwind CSS + shadcn/ui |
| **Backend** | Next.js Server Actions |
| **Database** | PostgreSQL (Neon) |
| **ORM** | Drizzle ORM |
| **Auth** | Clerk |
| **Validation** | Zod |
| **Type Safety** | TypeScript |
| **Deployment** | Vercel |

---

## 📊 Componentes Clave

### Server Actions
Operaciones del servidor ejecutadas desde el cliente:
```typescript
// features/auth/actions
export async function checkAdminStatus()
export async function getCurrentUser()

// features/newsletter/actions
export async function subscribeToNewsletter()

// features/admin/actions
export async function updateUserRole()
export async function createProject()
```

### Custom Hooks
Lógica reutilizable en componentes:
```typescript
// shared/hooks
useAdmin()           // Check admin status
useMobile()          // Detect mobile
useToast()           // Show notifications

// features/auth/hooks
useAuthUser()        // Current user + auth state
```

### UI Components
Componentes visuales reutilizables:
```typescript
// shared/components/ui (shadcn/ui)
Button, Form, Input, Dialog, Card, etc.

// shared/components/custom
Navbar, Footer, Newsletter, etc.
```

---

## 📈 Escalabilidad

### Agregar Nuevo Feature
1. Crear carpeta en `src/features/tunombre`
2. Dentro crear: `actions/`, `components/`, `hooks/`, `types.ts`
3. Implementar lógica del feature
4. Exportar desde `features/tunombre/index.ts`
5. Usar en páginas con `@features/tunombre/*`

### Agregar Nuevo Tipo
1. Agregar en `src/types/`
2. Importar con `@types/`

### Agregar Nuevo Utility
1. Crear en `src/shared/utils/`
2. Importar con `@utils/`

---

## 🧪 Testing

### Estructura de Tests
```
__tests__/
├── features/
│   └── auth/
│       └── actions.test.ts
├── shared/
│   └── utils/
│       └── formatDate.test.ts
└── integration/
    └── auth-flow.test.ts
```

### Ejecutar Tests
```bash
pnpm test
pnpm test:watch
pnpm test:coverage
```

---

## 📝 Documentación

- **Publica**: En `/docs/public` - Visible en repo
- **Privada**: En `/docs/private` - Encriptada, solo local

### Documentar Feature
Cada feature debe tener `README.md`:
```markdown
# Feature Name

## Descripción
...

## Componentes
...

## Actions
...

## Hooks
...

## Tipos
...

## Ejemplos
...
```

---

## 🔗 Referencias

- [Next.js Docs](https://nextjs.org/docs)
- [Clerk Auth](https://clerk.com/docs)
- [Drizzle ORM](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org/docs)

---

## ✅ Checklist de Desarrollo

- [ ] Feature organizado en `/src/features/nombre`
- [ ] Server actions en `actions/`
- [ ] Componentes en `components/`
- [ ] Tipos definidos en `types.ts`
- [ ] Importaciones con alias `@features/*`
- [ ] README.md documentando el feature
- [ ] Tests escritos
- [ ] Código formateado con Prettier
- [ ] ESLint sin warnings

---

**Esta arquitectura permite que el proyecto crezca de forma ordenada y mantenible.** 🚀
