# 🔧 GUÍA DE REMEDIACIÓN - SOLUCIONES TÉCNICAS

## SOLUCIÓN 1: AGREGAR SECURITY HEADERS

### Paso 1: Crear archivo `next.config.mjs` mejorado

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false, // CAMBIO: Habilitar para detectar issues
  },
  typescript: {
    ignoreBuildErrors: false, // CAMBIO: Habilitar para detectar issues
  },
  images: {
    unoptimized: true,
  },
  
  // NUEVO: Agregar security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Prevenir MIME sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Prevenir clickjacking
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // Protección XSS
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.clerk.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' *.clerk.com *.vercel.com",
          },
          // HSTS (seguridad HTTPS)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          // Referrer Policy
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Permissions Policy
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=()',
          },
        ],
      },
    ];
  },

  // NUEVO: Configurar CORS
  async rewrites() {
    return {
      afterFiles: [
        // Rate limiting middleware goes here
      ],
    };
  },
}

export default nextConfig
```

---

## SOLUCIÓN 2: OBFUSCAR EMAIL Y TELÉFONO

### Paso 1: Crear componente `ContactInfo.tsx`

```tsx
// components/contact-info.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin } from "lucide-react"
import React from "react"

export function ContactInfo() {
  // Obfuscar email
  const [showEmail, setShowEmail] = React.useState(false)
  const email = "federicobl93@gmail.com"
  const phone = "+61423562487"
  
  // Función para ofuscar email
  const obfuscateEmail = (email: string) => {
    const parts = email.split('@')
    return `${parts[0].substring(0, 3)}***@${parts[1].split('.')[0]}***`
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Email Card */}
      <div className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 p-6 rounded-lg border border-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all backdrop-blur">
        <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
        <h3 className="font-semibold text-white mb-2">Email</h3>
        {showEmail ? (
          <a
            href={`mailto:${email}`}
            className="text-primary hover:text-primary/80 transition-colors break-all"
          >
            {email}
          </a>
        ) : (
          <button
            onClick={() => setShowEmail(true)}
            className="text-primary hover:text-primary/80 transition-colors text-sm font-mono"
          >
            {obfuscateEmail(email)}
            <span className="block text-xs text-gray-500 mt-1">(click to reveal)</span>
          </button>
        )}
      </div>

      {/* Phone Card */}
      <div className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 p-6 rounded-lg border border-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all backdrop-blur">
        <Phone className="h-8 w-8 text-primary mx-auto mb-3" />
        <h3 className="font-semibold text-white mb-2">Contact</h3>
        <div className="space-y-2">
          <p className="text-sm text-gray-400">Use contact form or</p>
          <a
            href="https://linkedin.com/in/federico-bustos-systems-engineer"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 transition-colors block"
          >
            LinkedIn Message
          </a>
        </div>
      </div>

      {/* Location Card */}
      <div className="bg-gradient-to-br from-slate-900/50 to-slate-950/50 p-6 rounded-lg border border-primary/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all backdrop-blur">
        <MapPin className="h-8 w-8 text-primary mx-auto mb-3" />
        <h3 className="font-semibold text-white mb-2">Location</h3>
        <p className="text-gray-400">
          Australia (VIC)
        </p>
      </div>
    </div>
  )
}
```

---

## SOLUCIÓN 3: IMPLEMENTAR RATE LIMITING

### Paso 1: Instalar Upstash Redis

```bash
npm install @upstash/redis
```

### Paso 2: Crear archivo `lib/rate-limit.ts`

```typescript
// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Initialize Redis
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Create rate limit instance
export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 h'), // 5 requests per hour
});

export async function checkRateLimit(identifier: string) {
  try {
    const { success, limit, remaining, reset } = await ratelimit.limit(identifier);
    return { success, limit, remaining, reset };
  } catch (error) {
    // If Redis fails, allow request to go through
    console.error('Rate limit check failed:', error);
    return { success: true, limit: 5, remaining: 5, reset: Date.now() };
  }
}
```

### Paso 3: Actualizar `app/actions/newsletter.ts`

```typescript
// app/actions/newsletter.ts
"use server"

import { db, subscribers } from "@/lib/db"
import { checkRateLimit } from "@/lib/rate-limit"
import { z } from "zod"
import { headers } from "next/headers"

// Email validation schema
const newsletterSchema = z.object({
  email: z.string().email("Invalid email address").toLowerCase(),
  name: z.string().max(100, "Name too long").optional().default(""),
})

export type NewsletterState = {
  status: "idle" | "submitting" | "success" | "error"
  message: string
}

export async function subscribeToNewsletter(
  prevState: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {
  try {
    // Get IP address for rate limiting
    const headersList = await headers()
    const ip = headersList.get('x-forwarded-for') || 
               headersList.get('x-real-ip') || 
               'unknown'

    // Check rate limit
    const { success } = await checkRateLimit(`newsletter:${ip}`)
    if (!success) {
      return {
        status: "error",
        message: "Too many subscription attempts. Please try again later.",
      }
    }

    // Validate form data
    const email = formData.get("email") as string
    const name = formData.get("name") as string

    const validatedData = newsletterSchema.parse({ email, name })

    // Check if already subscribed
    const existing = await db.select().from(subscribers).where((t) => t.email === validatedData.email)
    
    if (existing.length > 0) {
      return {
        status: "error",
        message: "This email is already subscribed.",
      }
    }

    // Add to subscribers
    await db.insert(subscribers).values({
      email: validatedData.email,
      name: validatedData.name,
    })

    return {
      status: "success",
      message: "Successfully subscribed! Check your email for confirmation.",
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        status: "error",
        message: "Invalid input: " + error.errors[0].message,
      }
    }

    console.error("Newsletter subscription error:", error)
    // Don't expose internal errors
    return {
      status: "error",
      message: "Failed to subscribe. Please try again later.",
    }
  }
}
```

---

## SOLUCIÓN 4: IMPLEMENTAR CSRF PROTECTION

### Paso 1: Configurar Clerk CSRF

```typescript
// middleware.ts (mejorado)
import { clerkMiddleware, createRouteMatcher, getAuth } from "@clerk/nextjs/server";
import { isAdmin } from "@/lib/auth";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(['/admin','/resources(.*)', '/projects']);

export default clerkMiddleware(async (auth, req) => {
  // CSRF Protection: Validar origin en requests POST
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
    const origin = req.headers.get('origin')
    const host = req.headers.get('host')
    
    // Solo permitir requests del mismo origen
    if (origin && !origin.includes(host || '')) {
      return NextResponse.json(
        { error: 'CSRF token validation failed' },
        { status: 403 }
      )
    }
  }

  if (isProtectedRoute(req)) await auth.protect()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
```

---

## SOLUCIÓN 5: IMPLEMENTAR SENTRY PARA ERROR LOGGING

### Paso 1: Instalar Sentry

```bash
npm install @sentry/nextjs
```

### Paso 2: Crear `sentry.client.config.ts`

```typescript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  debug: false,
  // Mask sensitive data
  beforeSend(event) {
    if (event.request) {
      delete event.request.cookies;
      delete event.request.headers['authorization'];
    }
    return event;
  },
});
```

### Paso 3: Actualizar error logging

```typescript
// Cambiar de console.error a Sentry
import * as Sentry from "@sentry/nextjs";

try {
  // code
} catch (error) {
  // Log to Sentry, no a console
  Sentry.captureException(error, {
    level: 'error',
    tags: {
      section: 'newsletter',
    },
  });
  
  // Return generic error to user
  return {
    status: "error",
    message: "An error occurred. Please try again later.",
  }
}
```

---

## SOLUCIÓN 6: VALIDACIÓN CON ZOD

```typescript
// lib/validators.ts
import { z } from 'zod'

export const emailSchema = z.string()
  .email("Invalid email")
  .toLowerCase()
  .max(255)

export const nameSchema = z.string()
  .min(1, "Name required")
  .max(100)
  .regex(/^[a-zA-Z\s'-]+$/, "Invalid characters in name")

export const newsletterSubscriptionSchema = z.object({
  email: emailSchema,
  name: nameSchema.optional().default(""),
})

export type NewsletterSubscription = z.infer<typeof newsletterSubscriptionSchema>
```

---

## SOLUCIÓN 7: ENVIRONMENT VARIABLES SEGUROS

### Archivo `.env.example`

```env
# Database
DATABASE_URL=postgresql://...

# Redis for rate limiting
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...

# Error tracking
NEXT_PUBLIC_SENTRY_DSN=...

# Security
NEXT_PUBLIC_RECAPTCHA_KEY=...
```

---

## CHECKLIST DE IMPLEMENTACIÓN

```
FASE 1 (CRÍTICO - HOY):
□ Actualizar next.config.mjs con security headers
□ Crear componente ContactInfo para obfuscar datos
□ Actualizar página de contact en app/page.tsx
□ Crear rate-limit.ts con Upstash
□ Actualizar newsletter.ts con validación

FASE 2 (ESTA SEMANA):
□ Instalar y configurar Sentry
□ Actualizar todos los console.error a Sentry
□ Implementar CSRF protection en middleware
□ Agregar validación Zod a todas las acciones
□ Crear .env.example con variables seguras

FASE 3 (TESTING):
□ Probar security headers con SecurityHeaders.com
□ Pruebas de rate limiting
□ Pruebas de CSRF protection
□ Validar OWASP Top 10
```

