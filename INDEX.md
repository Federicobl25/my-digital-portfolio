# 📚 ÍNDICE DE DOCUMENTACIÓN DEL PROYECTO

## 🎯 Comienza Aquí

**¿Primera vez?** Lee esto primero:
- [PROJECT_STRUCTURE_GUIDE.md](./PROJECT_STRUCTURE_GUIDE.md) - Guía completa de la estructura

**¿Quieres overview?** Lee:
- [STATUS_REPORT.md](./STATUS_REPORT.md) - Resumen de todo lo que se hizo

**¿Necesitas detalles técnicos?** Lee:
- [ORGANIZATION_SUMMARY.md](./ORGANIZATION_SUMMARY.md) - Resumen técnico

---

## 📖 Documentación Pública

### Arquitectura
- [docs/public/ARCHITECTURE.md](./docs/public/ARCHITECTURE.md)
  - Visión general del proyecto
  - Stack tecnológico
  - Componentes clave
  - Cómo escalar

### Guías
- `docs/guides/` - Tutoriales y guías (vacío - agregar según sea necesario)

---

## 🔒 Documentación Privada

**Ubicación:** `docs/private/` (ENCRIPTADA)

### Archivos Protegidos
- [docs/private/SECURITY_AUDIT.md](./docs/private/SECURITY_AUDIT.md)
  - Reportes de seguridad
  - Vulnerabilidades
  - Incidentes
  - Checklist de seguridad

### Cómo Acceder
```bash
# Desencriptar cuando lo necesites
node scripts/crypto.js decrypt docs/private/SECURITY_AUDIT.md.enc

# Luego puedes leer
cat docs/private/SECURITY_AUDIT.md

# Para protegerlo de nuevo
node scripts/crypto.js encrypt docs/private/SECURITY_AUDIT.md
```

---

## 📁 Estructura del Proyecto

```
/src                          Código fuente organizado
├── /config                   Configuraciones globales
├── /database                 Capa de datos (ORM + schema)
├── /features                 Features por dominio
├── /shared                   Código compartido
└── /types                    Tipos TypeScript

/docs                         Documentación
├── /public                   Pública (en GitHub)
├── /private                  Privada (encriptada, local)
└── /guides                   Guías y tutoriales

/app, /components, /lib       Código existente (migrar gradualmente)
/scripts                      Scripts útiles
```

---

## 🔐 Seguridad

### Variables de Entorno
- Ver [.env.local.example](./.env.local.example) para plantilla
- Tu `.env` / `.env.local` nunca debe committearse
- Usar GitHub Secrets para CI/CD

### Documentación Sensible
- Ubicada en `docs/private/`
- Encriptada con AES-256
- Contraseña requerida para acceder
- Nunca en GitHub

### Secretos
- Database credentials
- API keys (Clerk, SendGrid)
- Authentication tokens
- Todas en `.env.local` (ignorado en Git)

---

## 🚀 TypeScript Alias

Importar código usando alias limpios:

```typescript
// Ejemplos
import { Button } from '@components/ui';
import { useAuth } from '@features/auth/hooks';
import type { User } from '@types/database';
import { formatDate } from '@utils';
import { dbClient } from '@config/database';
import { getUserById } from '@database/queries';
```

---

## 📋 Próximos Pasos

### Fase 2: Migración de Código
1. Mover `lib/` → `src/config/`
2. Mover `components/` → `src/shared/components/`
3. Mover `hooks/` → `src/shared/hooks/`
4. Crear features en `src/features/`

### Fase 3: Actualizar Imports
1. Cambiar a usar alias

### Fase 4: Limpieza
1. Eliminar carpetas antiguas
2. Testing completo

---

## 💡 Utilidades

### Encriptación
```bash
# Encriptar documento
node scripts/crypto.js encrypt docs/private/ARCHIVO.md

# Desencriptar documento
node scripts/crypto.js decrypt docs/private/ARCHIVO.md.enc
```

### Desarrollo
```bash
# Iniciar servidor
pnpm dev

# Build para producción
pnpm build

# Linting
pnpm lint
```

### Git
```bash
# Ver cambios
git status

# Hacer commit
git add .
git commit -m "Descripción"

# Push a GitHub
git push
```

---

## 🎓 Recursos Externos

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Drizzle ORM](https://orm.drizzle.team)
- [Clerk Authentication](https://clerk.com/docs)
- [Tailwind CSS](https://tailwindcss.com)

---

## ❓ Preguntas Frecuentes

**P: ¿Cómo agrego un nuevo feature?**
R: Crea una carpeta en `src/features/tunombre` con `actions/`, `components/`, `hooks/`, `types.ts`

**P: ¿Cómo encripto mis reportes?**
R: `node scripts/crypto.js encrypt docs/private/ARCHIVO.md`

**P: ¿Puedo commitear docs/private?**
R: NO. Está en .gitignore. Solo local y respaldos encriptados externos.

**P: ¿Cuáles son los alias disponibles?**
R: @config, @database, @features, @shared, @types, @components, @hooks, @utils

**P: ¿Cómo cambio a la nueva estructura?**
R: Lee PROJECT_STRUCTURE_GUIDE.md - tiene un plan gradual de migración

---

## 📞 Soporte

Si tienes problemas:
1. Revisa la documentación correspondiente
2. Busca en docs/public/ARCHITECTURE.md
3. Consulta STATUS_REPORT.md para cambios recientes

---

## ✅ Checklist Final

- [ ] Leí PROJECT_STRUCTURE_GUIDE.md
- [ ] Entiendo la nueva estructura
- [ ] Sé cómo encriptar documentos
- [ ] Probé que el servidor funciona (pnpm dev)
- [ ] Revisé los archivos creados
- [ ] Estoy listo para empezar a trabajar

---

**Última actualización:** 6 de diciembre, 2025  
**Versión:** 1.0  
**Estado:** ✅ COMPLETADO

---

*Para volver a este índice, lee: [INDEX.md](./INDEX.md)*
