# Security Policy

## Security Headers

This project implements security best practices through HTTP headers configured in `vercel.json`:

### Implemented Headers

1. **Strict-Transport-Security (HSTS)**
   - Forces HTTPS connections for 2 years
   - Includes all subdomains
   - Preload ready for browser inclusion

2. **X-Content-Type-Options**
   - Prevents MIME-type sniffing
   - Protects against drive-by downloads

3. **X-Frame-Options**
   - Prevents clickjacking attacks
   - Blocks site from being embedded in iframes

4. **Referrer-Policy**
   - Controls referrer information sent with requests
   - Balances privacy with functionality

5. **Permissions-Policy**
   - Restricts access to browser features
   - Disables camera, microphone, and geolocation

6. **Content-Security-Policy (CSP)**
   - Mitigates XSS attacks
   - Controls resource loading sources
   - Allows inline scripts/styles (required for Vite HMR)

## Testing Security Headers

### Production Environment

Test headers in production using curl:

```bash
curl -I https://your-domain.vercel.app
```

Expected response should include all security headers listed above.

### Online Tools

Use these tools to verify security posture:

- [SecurityHeaders.com](https://securityheaders.com)
- [Mozilla Observatory](https://observatory.mozilla.org)
- [SSL Labs](https://www.ssllabs.com/ssltest/)

## Reporting Security Issues

If you discover a security vulnerability:

1. **DO NOT** create a public GitHub issue
2. Email security concerns to: [your-security-email@domain.com]
3. Include detailed description and reproduction steps
4. Allow 48 hours for initial response

## Security Updates

- Dependabot monitors dependencies weekly
- Security patches are applied within 7 days of disclosure
- npm audit runs on every CI build

## Vercel Platform Security

This project leverages Vercel's built-in security features:

- Automatic SSL/TLS certificates
- DDoS protection at the edge
- Environment variable encryption
- Automatic security updates

## Dependencies

Security audits run automatically:
- On every push (CI pipeline)
- Weekly via Dependabot
- Before production deployments

Critical vulnerabilities block deployment.

## Best Practices

When contributing:
- Never commit secrets or API keys
- Use environment variables for sensitive data
- Keep dependencies updated
- Run `npm audit` before pushing
- Follow secure coding guidelines

---

Last updated: 2025-10-21
