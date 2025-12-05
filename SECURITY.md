# Security Policy

## Reporting Security Vulnerabilities

If you discover a security vulnerability in this project, please email **federicobl93@gmail.com** with:

1. **Description**: Clear description of the vulnerability
2. **Steps to reproduce**: Detailed steps to reproduce the issue
3. **Impact**: Potential impact and severity
4. **Suggested fix**: If available

**Please do NOT open public issues for security vulnerabilities.**

## Security Measures Implemented

### 1. **Content Security Policy (CSP)**
- Strict CSP headers prevent XSS attacks
- Inline scripts restricted to necessary integrations (Clerk)
- External resources whitelisted

### 2. **Input Validation & Sanitization**
- All user inputs validated with Zod schemas
- HTML sanitization prevents XSS
- Email validation with regex and format checks

### 3. **Rate Limiting**
- API endpoints: 30 requests/minute per IP
- General requests: 200 requests/minute per IP
- Prevents brute force attacks and DoS

### 4. **Authentication & Authorization**
- Clerk authentication for admin routes
- Protected admin panel requires authentication
- Session management handled by Clerk

### 5. **HTTPS & Transport Security**
- Strict-Transport-Security header enforces HTTPS
- HSTS preload enabled
- All sensitive data transmitted over HTTPS

### 6. **HTTP Security Headers**
- X-Frame-Options: SAMEORIGIN (prevent clickjacking)
- X-Content-Type-Options: nosniff (prevent MIME sniffing)
- X-XSS-Protection: 1; mode=block (enable browser XSS filter)
- Referrer-Policy: strict-origin-when-cross-origin

### 7. **Database Security**
- Parameterized queries prevent SQL injection
- Drizzle ORM provides type-safe database access
- Environment variables protect sensitive credentials

### 8. **Environment Variables**
- Sensitive data never hardcoded
- .env.local excluded from version control
- Example .env.example provided
- CLERK_SECRET_KEY kept server-side only

### 9. **Security Logging**
- Security events logged with severity levels
- Low: Info events (successful operations)
- Medium: Suspicious activity (duplicate subscriptions)
- High: Errors and exceptions
- Critical: Security breaches

### 10. **Dependencies**
- Regular dependency updates
- Vulnerable packages excluded
- npm audit passed

## Security Best Practices

### For Deployment
1. Set environment variables on hosting platform (not in files)
2. Enable database-level authentication
3. Use HTTPS only
4. Regular backups enabled
5. Monitor logs for suspicious activity

### For Development
1. Use .env.local for local development (never commit)
2. Run `npm audit` before commits
3. Keep dependencies updated
4. Review security logs regularly
5. Use strong authentication credentials

## Compliance

This site complies with:
- OWASP Top 10 Security Risks
- GDPR data protection requirements
- Security best practices guidelines

## Known Limitations

1. **Rate Limiting**: Current in-memory implementation. Use Redis for production scalability.
2. **CSRF Protection**: Currently managed by Next.js and Clerk. Consider CSRF tokens for additional protection.
3. **Logging**: Currently logs to console. Integrate with external logging service (Sentry, DataDog) in production.

## Future Improvements

- [ ] Implement Redis-based rate limiting
- [ ] Add Web Application Firewall (WAF)
- [ ] Enable API key management for integrations
- [ ] Implement request signing
- [ ] Add security headers testing in CI/CD
- [ ] Regular security audits and penetration testing

## Questions?

For security-related questions, please contact: **federicobl93@gmail.com**
