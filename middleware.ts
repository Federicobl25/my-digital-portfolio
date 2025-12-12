import { clerkMiddleware, createRouteMatcher, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define protected routes that require authentication
const isProtectedRoute = createRouteMatcher(['/admin','/resources(.*)', '/projects']);

// Simple in-memory rate limiter (use Redis for production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Trusted origins for CORS validation (UPDATED Dec 2025)
const TRUSTED_ORIGINS = [
  process.env.NEXT_PUBLIC_APP_URL,
  'http://localhost:3000',
  'http://localhost:3001',
  'https://localhost:3000',
].filter(Boolean);

// Security: Maximum request body size (1MB)
const MAX_BODY_SIZE = 1024 * 1024;

// Validate CORS Origin (ADDED Dec 2025)
function validateOrigin(req: NextRequest): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return true; // Allow requests without origin (server-side requests)
  return TRUSTED_ORIGINS.includes(origin);
}

function rateLimit(identifier: string, limit: number = 100, windowMs: number = 60000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count < limit) {
    record.count++;
    return true;
  }

  return false;
}

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000);

export default clerkMiddleware(async (auth, req) => {
  // Validate CORS origin (ADDED Dec 2025)
  if (req.method !== 'GET' && !validateOrigin(req)) {
    console.warn(`[SECURITY] Blocked request from untrusted origin: ${req.headers.get('origin')}`);
    return NextResponse.json(
      { error: 'CORS policy violation' },
      { status: 403 }
    );
  }

  // Get client IP
  const ip = req.headers.get('x-forwarded-for') || 
             req.headers.get('x-real-ip') || 
             'unknown';

  // Security: Verify request method is allowed
  const method = req.method.toUpperCase();
  const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];
  if (!allowedMethods.includes(method)) {
    return NextResponse.json(
      { error: 'Method not allowed' },
      { status: 405 }
    );
  }

  // Security: Check for suspiciously large requests
  const contentLength = req.headers.get('content-length');
  if (contentLength && parseInt(contentLength) > MAX_BODY_SIZE) {
    return NextResponse.json(
      { error: 'Request payload too large' },
      { status: 413 }
    );
  }

  // Rate limiting for API routes (stricter)
  if (req.nextUrl.pathname.startsWith('/api/')) {
    if (!rateLimit(`api:${ip}`, 30, 60000)) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429, headers: { 'Retry-After': '60' } }
      );
    }
  }

  // General rate limiting
  if (!rateLimit(`general:${ip}`, 200, 60000)) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429, headers: { 'Retry-After': '60' } }
    );
  }

  // Protect admin routes
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};