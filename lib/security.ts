import crypto from 'crypto';
import { z } from 'zod';

/**
 * Input validation schemas
 */
export const newsletterSchema = z.object({
  email: z.string().email('Invalid email address').toLowerCase().trim(),
});

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100).trim(),
  email: z.string().email('Invalid email address').toLowerCase().trim(),
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(200).trim(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000).trim(),
});

/**
 * Sanitize HTML to prevent XSS
 */
export function sanitizeHtml(input: string): string {
  if (!input) return '';
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .trim();
}

/**
 * Validate and sanitize user input
 */
export function validateAndSanitize<T>(schema: z.ZodSchema, data: unknown): T {
  const validated = schema.parse(data);
  
  // Recursively sanitize string values
  const sanitized = JSON.parse(
    JSON.stringify(validated),
    (key, value) => {
      if (typeof value === 'string') {
        return sanitizeHtml(value);
      }
      return value;
    }
  );
  
  return sanitized as T;
}

/**
 * Generate CSRF token
 */
export function generateCsrfToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Verify CSRF token
 */
export function verifyCsrfToken(token: string, storedToken: string): boolean {
  return crypto.timingSafeEqual(
    Buffer.from(token),
    Buffer.from(storedToken)
  );
}

/**
 * Hash sensitive data (for logging purposes)
 */
export function hashSensitiveData(data: string): string {
  return crypto
    .createHash('sha256')
    .update(data)
    .digest('hex')
    .substring(0, 8);
}

/**
 * Security logging
 */
export function logSecurityEvent(
  event: string,
  severity: 'low' | 'medium' | 'high' | 'critical',
  details: Record<string, unknown> = {}
): void {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    event,
    severity,
    details,
    environment: process.env.NODE_ENV,
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[${severity.toUpperCase()}] ${event}:`, details);
  }

  // In production, send to external logging service
  if (process.env.NODE_ENV === 'production') {
    // TODO: Integrate with external logging service (e.g., Sentry, DataDog, LogRocket)
    console.error(`[SECURITY] ${event}:`, logEntry);
  }
}

/**
 * Check if request is from trusted origin
 */
export function isTrustedOrigin(origin: string | null): boolean {
  const trustedOrigins = [
    process.env.NEXT_PUBLIC_APP_URL,
    'http://localhost:3000',
    'http://localhost:3001',
  ].filter(Boolean);

  return trustedOrigins.includes(origin || '');
}

/**
 * Get client IP from request
 */
export function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get('x-forwarded-for');
  const realIp = req.headers.get('x-real-ip');
  
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  if (realIp) {
    return realIp;
  }
  
  return 'unknown';
}
