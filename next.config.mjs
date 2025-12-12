/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false, // FIXED: Changed to false for strict type checking in production
  },
  images: {
    // Enable automatic image optimization
    unoptimized: false,
    // Optimize for production performance
    formats: ['image/avif', 'image/webp'],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes for srcSet generation
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Allow SVG images
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          // Content Security Policy - HARDENED (Updated Dec 2025)
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' https://clerk.com https://*.clerkstatic.com https://cdn.jsdelivr.net;
              style-src 'self' https://*.clerkstatic.com https://fonts.googleapis.com;
              img-src 'self' data: blob: https://clerk.com https://*.clerkstatic.com https://cdn.jsdelivr.net;
              font-src 'self' https://fonts.gstatic.com https://*.clerkstatic.com data:;
              connect-src 'self' https://clerk.com https://*.neon.tech wss://*.neon.tech;
              frame-src 'self' https://clerk.com;
              object-src 'none';
              base-uri 'self';
              form-action 'self';
              frame-ancestors 'self';
              upgrade-insecure-requests;
              block-all-mixed-content;
            `.replace(/\s+/g, ' '),
          },
          // X-Frame-Options - Prevent clickjacking
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          // X-Content-Type-Options - Prevent MIME sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // X-XSS-Protection - Enable XSS filter
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // Referrer-Policy
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Permissions-Policy - Restrict sensitive APIs
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=(), camera=(), usb=(), payment=()',
          },
          // Strict-Transport-Security - Force HTTPS
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          // Additional Security Headers (Updated Dec 2025)
          {
            key: 'X-Permitted-Cross-Domain-Policies',
            value: 'none',
          },
          // Cross-Origin-Opener-Policy
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          // Cross-Origin-Embedder-Policy
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          // Cross-Origin-Resource-Policy
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-site',
          },
        ],
      },
    ];
  },
}

export default nextConfig
