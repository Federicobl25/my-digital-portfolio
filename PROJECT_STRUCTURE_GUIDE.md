# 📁 GUÍA DE ESTRUCTURA DEL PROYECTO

## 🎯 Descripción General

Tu proyecto ha sido reorganizado siguiendo mejores prácticas de arquitectura. El código está ahora organizado por **features** (características) en lugar de por tipo de archivo.

### ✨ Beneficios
- 🎯 Fácil de navegar
- 📦 Modular y escalable
- 🔐 Documentación privada protegida
- 🚀 Mejor para testing
- 👥 Más mantenible

---

## 📂 Estructura Principal

```
my-digital-portfolio/
│
├── 📂 src/                    # Código fuente (NUEVA ESTRUCTURA)
│   ├── config/                # Configuraciones globales
│   ├── database/              # Capa de datos
│   ├── features/              # Características por dominio
│   ├── shared/                # Código compartido
│   └── types/                 # Tipos TypeScript
│
├── 📂 app/                    # Rutas Next.js (gradualmente migrar a src)
├── 📂 public/                 # Archivos estáticos
├── 📂 docs/                   # Documentación
│   ├── public/                # Documentación pública
│   ├── private/               # 🔒 Reportes privados (ENCRIPTADO)
│   └── guides/                # Guías y tutoriales
│
├── 📂 scripts/                # Scripts útiles
├── 📄 .env                    # Variables de entorno
├── 📄 .env.local.example      # Ejemplo de variables
├── 📄 package.json            # Dependencias
└── 📄 tsconfig.json           # Config TypeScript
```

---

## 🔍 Detalles por Carpeta

### `/src/config` - Configuraciones
```
config/
├── auth.ts                # Configuración Clerk
├── database.ts            # Conexión a BD
├── security.ts            # Políticas de seguridad
└── constants.ts           # Constantes globales
```

**Uso:**
```typescript
import { getClerkConfig } from '@config/auth';
import { dbClient } from '@config/database';
```

---

### `/src/database` - Capa de Datos
```
database/
├── schema.ts              # Esquema Drizzle ORM
├── migrations/            # Migraciones SQL
├── seeds/                 # Datos de prueba
└── queries.ts             # Queries reutilizables
```

**Uso:**
```typescript
import { users, projects } from '@database/schema';
import { getUserById } from '@database/queries';
```

---

### `/src/features` - Características

Organizado por dominio. Cada feature es independiente:

```
features/
├── auth/
│   ├── actions/           # Server actions
│   ├── components/        # Componentes
│   ├── hooks/             # Custom hooks
│   ├── types.ts           # Tipos locales
│   └── README.md          # Documentación
│
├── newsletter/
├── projects/
├── admin/
└── blog/
```

**Uso:**
```typescript
import { AuthForm } from '@features/auth/components';
import { useAuthUser } from '@features/auth/hooks';
import { checkAdminStatus } from '@features/admin/actions';
```

---

### `/src/shared` - Código Compartido

```
shared/
├── components/            # UI components (shadcn/ui + custom)
├── hooks/                 # Hooks reutilizables
├── utils/                 # Funciones auxiliares
├── constants/             # Constantes globales
└── types/                 # Tipos compartidos
```

**Uso:**
```typescript
import { Button } from '@shared/components/ui';
import { useMobile } from '@shared/hooks';
import { formatDate } from '@shared/utils';
```

---

### `/src/types` - TypeScript

```
types/
├── database.ts            # Tipos de BD
├── api.ts                 # Tipos de API
├── common.ts              # Tipos comunes
└── index.ts               # Re-exports
```

**Uso:**
```typescript
import type { User, Project } from '@types';
```

---

### `/docs/private` - 🔒 Documentación Privada

**ENCRIPTADA CON AES-256**

Solo visible para el propietario del proyecto.

Contiene:
- 📋 `SECURITY_AUDIT.md` - Reportes de seguridad
- 🚨 `VULNERABILITIES.md` - Problemas encontrados
- 📝 `INCIDENT_LOG.md` - Registro de incidentes
- 📊 `AUDIT_REPORTS/` - Auditorías detalladas

**Para encriptar/desencriptar:**
```bash
# Encriptar
node scripts/crypto.js encrypt docs/private/SECURITY_AUDIT.md

# Desencriptar
node scripts/crypto.js decrypt docs/private/SECURITY_AUDIT.md.enc
```

---

## 🚀 Importaciones con Alias

Después de la migración, usarás estos alias:

| Alias | Significa | Ejemplo |
|-------|-----------|---------|
| `@config/*` | src/config | `@config/auth` |
| `@database/*` | src/database | `@database/schema` |
| `@features/*` | src/features | `@features/auth/components` |
| `@shared/*` | src/shared | `@shared/components/ui` |
| `@types/*` | src/types | `@types/database` |
| `@components/*` | src/shared/components | `@components/Button` |
| `@hooks/*` | src/shared/hooks | `@hooks/useMobile` |
| `@utils/*` | src/shared/utils | `@utils/formatDate` |

---

## 📝 Plan de Migración (Gradual)

### Fase 1: Preparación ✅ COMPLETADA
- [x] Crear nuevas carpetas
- [x] Configurar alias en tsconfig.json
- [x] Crear scripts de utilidad

### Fase 2: Migración de configuración (PRÓXIMO)
- [ ] Mover `lib/auth.ts` → `src/config/auth.ts`
- [ ] Mover `lib/db.ts` → `src/database/schema.ts`
- [ ] Mover `lib/security.ts` → `src/config/security.ts`
- [ ] Actualizar imports globales

### Fase 3: Migración de features
- [ ] Mover `app/actions/` → `src/features/*/actions/`
- [ ] Mover `components/` → `src/shared/components/`
- [ ] Mover `hooks/` → `src/shared/hooks/`

### Fase 4: Limpieza final
- [ ] Eliminar carpetas antiguas
- [ ] Actualizar documentación
- [ ] Testing completo

---

## 🔐 Seguridad

### Documentación Privada
- ✅ Encriptación AES-256
- ✅ Solo acceso local
- ✅ Ignorada en Git
- ✅ Contraseña requerida

### Secretos
- ✅ `.env` ignorado en Git
- ✅ Ejemplo en `.env.local.example`
- ✅ Variables en GitHub Secrets para CI/CD

### Permisos
```bash
# Proteger carpeta privada (solo lectura)
chmod 700 docs/private
```

---

## 💡 Mejores Prácticas

### 1. Crear Nuevo Feature
```typescript
// features/mifeature/
├── actions/
│   └── index.ts          // Server actions
├── components/
│   ├── index.ts          // Re-exports
│   └── Form.tsx          // Componentes
├── hooks/
│   └── useMiFeature.ts
├── types.ts              // Tipos locales
└── README.md             // Documentación
```

### 2. Importaciones
```typescript
// ✅ BIEN
import { Button } from '@components/ui';
import { useAuth } from '@features/auth/hooks';

// ❌ EVITAR
import Button from '../../../../../components/ui/button';
```

### 3. Exports
```typescript
// features/auth/components/index.ts
export { LoginForm } from './LoginForm';
export { SignupForm } from './SignupForm';
```

---

## 🛠️ Scripts Útiles

### Encriptar documentos privados
```bash
node scripts/crypto.js encrypt docs/private/SECURITY_AUDIT.md
```

### Desencriptar documentos
```bash
node scripts/crypto.js decrypt docs/private/SECURITY_AUDIT.md.enc
```

---

## 📚 Documentación

- [Arquitectura Completa](./ARCHITECTURE.md)
- [Guía de Setup](./SETUP.md)
- [Mejores Prácticas](./guides/best-practices.md)

---

## ❓ Preguntas Frecuentes

**P: ¿Por qué esta estructura?**  
R: Feature-based es más escalable y mantenible que type-based.

**P: ¿Cómo agrego un nuevo feature?**  
R: Crea una carpeta en `src/features/tunombre` con acciones, componentes y tipos.

**P: ¿Qué pasa con `app/` antigua?**  
R: Se mantiene por ahora. Migraremos gradualmente.

**P: ¿Cómo encripto mis reportes?**  
R: `node scripts/crypto.js encrypt docs/private/archivo.md`

**P: ¿Puedo commitear docs/private?**  
R: NO. Está en .gitignore. Solo local y respaldos encriptados externos.

---

## 🎓 Siguiente Paso

1. Familiarízate con esta estructura
2. Cuando estés listo, iniciamos migración de archivos
3. Actualizamos imports gradualmente
4. Testing completo

¿Dudas? Revisa ARCHITECTURE.md para detalles técnicos.

**Happy coding! 🚀**
