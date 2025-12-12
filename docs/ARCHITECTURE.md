# 📁 ESTRUCTURA DEL PROYECTO - ORGANIZACIÓN LÓGICA

## Raíz del Proyecto
```
my-digital-portfolio/
├── src/                          # Código fuente principal
├── app/                          # Rutas Next.js (temporal, migrar a src)
├── public/                       # Archivos estáticos
├── docs/                         # Documentación
├── scripts/                      # Scripts útiles
├── config/                       # Archivos de configuración
│   ├── next.config.mjs
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── drizzle.config.ts
│   └── eslint.config.mjs
└── .env                          # Variables de entorno (no commitear)
```

## 📂 `/src` - Código Fuente

La estructura `src/` sigue un patrón de características y capas:

### `/src/config`
Configuraciones globales de la aplicación
```
config/
├── auth.ts              # Configuración Clerk
├── database.ts          # Conexión a BD
├── security.ts          # Políticas de seguridad
└── constants.ts         # Constantes globales
```

### `/src/database`
Capa de datos
```
database/
├── schema.ts            # Esquema Drizzle ORM
├── migrations/          # Migraciones de BD
├── seeds/               # Datos iniciales
└── queries.ts           # Queries reutilizables
```

### `/src/features`
Características organizadas por dominio
```
features/
├── auth/
│   ├── actions/         # Server actions
│   ├── components/      # Componentes React
│   ├── hooks/           # Custom hooks
│   ├── types.ts         # Tipos TypeScript
│   └── README.md        # Documentación del feature
├── newsletter/
├── projects/
├── admin/
└── blog/
```

### `/src/shared`
Código compartido (utilities, helpers, constants)
```
shared/
├── components/          # Componentes globales (UI)
├── hooks/               # Hooks reutilizables
├── utils/               # Funciones auxiliares
├── constants/           # Constantes globales
└── types/               # Tipos compartidos
```

### `/src/types`
Definiciones de tipos TypeScript
```
types/
├── database.ts          # Tipos de BD
├── api.ts               # Tipos de API
├── common.ts            # Tipos comunes
└── index.ts             # Barrel exports
```

## 📚 `/docs` - Documentación

### `/docs/public`
Documentación pública (visible en repo)
```
public/
├── ARCHITECTURE.md      # Arquitectura del proyecto
├── API.md               # Documentación de APIs
├── SETUP.md             # Guía de instalación
└── CONTRIBUTING.md      # Guía para contribuidores
```

### `/docs/private` 🔒 **ENCRIPTADO**
Documentación privada (solo para ti como dueño)
```
private/
├── SECURITY_AUDIT.md    # Reportes de seguridad
├── VULNERABILITIES.md   # Vulnerabilidades encontradas
├── INCIDENT_LOG.md      # Registro de incidentes
├── AUDIT_REPORTS/       # Auditorías técnicas
└── CREDENTIALS/         # Notas sobre credenciales (no guardar aquí!)
```

### `/docs/guides`
Guías y tutoriales
```
guides/
├── deployment.md        # Despliegue
├── database-setup.md    # Setup de BD
└── security-checklist.md # Lista de seguridad
```

## 🔐 Seguridad de `/docs/private`

**Los archivos en `docs/private/` deben estar:**
- ✅ Encriptados con AES-256
- ✅ Protegidos con contraseña
- ✅ Ignorados en .gitignore
- ✅ Solo en máquina local
- ✅ Backup encriptado externo

**Para encriptar archivos:**
```bash
# Encriptar
node scripts/encrypt.js docs/private/SECURITY_AUDIT.md

# Desencriptar
node scripts/decrypt.js docs/private/SECURITY_AUDIT.md.enc
```

## 📋 Migración de Archivos Existentes

### De `app/` → `src/features/`
```
app/actions/              → src/features/*/actions/
app/admin/                → src/features/admin/
app/blog/                 → src/features/blog/
app/projects/             → src/features/projects/
```

### De `lib/` → `src/`
```
lib/auth.ts               → src/config/auth.ts
lib/db.ts                 → src/database/schema.ts
lib/types.ts              → src/types/
lib/utils.ts              → src/shared/utils/
lib/security.ts           → src/config/security.ts
```

### De `components/` → `src/shared/components/`
```
components/ui/*           → src/shared/components/ui/
components/navbar.tsx     → src/shared/components/navbar.tsx
```

### De `hooks/` → `src/shared/hooks/`
```
hooks/*                   → src/shared/hooks/
```

## 🚀 Implementación Gradual

**IMPORTANTE:** No cambiar todo de una vez. Hacerlo paso a paso:

1. ✅ Crear nueva estructura (YA HECHO)
2. ⏳ Crear alias en tsconfig.json para nuevas rutas
3. ⏳ Mover archivos gradualmente
4. ⏳ Actualizar imports por partes
5. ⏳ Eliminar carpetas antiguas cuando todo esté migrado

## 📝 Beneficios de esta Estructura

✅ **Claridad:** Fácil encontrar archivos por su propósito  
✅ **Escalabilidad:** Agregar features sin desorden  
✅ **Mantenibilidad:** Código organizado y documentado  
✅ **Seguridad:** Documentación sensible protegida  
✅ **Modularidad:** Features independientes  
✅ **Testing:** Fácil escribir y ubicar tests  

## 🔗 Referencias
- [Next.js Best Practices](https://nextjs.org/docs)
- [TypeScript Project Structure](https://www.typescriptlang.org/docs)
- [Feature-Based Architecture](https://en.wikipedia.org/wiki/Feature-oriented_architecture)
