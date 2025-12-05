/**
 * Security utilities for request/response handling
 * Prevents information disclosure and security header leakage
 */

/**
 * Remove sensitive headers from responses
 */
export function sanitizeResponseHeaders(headers: HeadersInit): HeadersInit {
  const safeHeaders: Record<string, string> = {};
  
  const allowedHeaders = [
    'content-type',
    'content-length',
    'content-encoding',
    'cache-control',
    'expires',
    'etag',
    'vary',
    'access-control-allow-origin',
  ];

  // Only include safe headers
  for (const [key, value] of Object.entries(headers)) {
    if (allowedHeaders.includes(key.toLowerCase())) {
      safeHeaders[key] = String(value);
    }
  }

  return safeHeaders;
}

/**
 * Check Content-Type and validate it's expected type
 */
export function validateContentType(
  contentType: string | null,
  expectedType: string
): boolean {
  if (!contentType) return false;
  return contentType.includes(expectedType);
}

/**
 * Validate JSON input
 */
export function isValidJSON(text: string): boolean {
  try {
    JSON.parse(text);
    return true;
  } catch {
    return false;
  }
}

/**
 * Safely parse JSON with size limit
 */
export function safeParseJSON(
  text: string,
  maxSize: number = 1000000 // 1MB
): unknown | null {
  if (text.length > maxSize) {
    throw new Error('JSON payload too large');
  }

  if (!isValidJSON(text)) {
    throw new Error('Invalid JSON');
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    return null;
  }
}

/**
 * Validate request method
 */
export function isAllowedMethod(
  method: string | undefined,
  allowed: string[]
): boolean {
  return method ? allowed.includes(method.toUpperCase()) : false;
}
