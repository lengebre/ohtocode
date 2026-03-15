# Security (OWASP Top 10 alignment)

This document describes how this static React app addresses [OWASP Top 10](https://owasp.org/Top10/) where applicable. The app has no backend, authentication, or persistent user data.

| OWASP 2021 | Mitigation |
|------------|------------|
| **A01 Broken Access Control** | Static site; no privileged routes or server. All content is public by design. |
| **A02 Cryptographic Failures** | No sensitive data stored or transmitted. No crypto in use. |
| **A03 Injection (XSS)** | (1) React escapes all rendered text by default. (2) No `dangerouslySetInnerHTML` or raw HTML from user input. (3) Production build injects a strict **Content-Security-Policy** (script-src 'self', frame-ancestors 'none', etc.) via a Vite plugin. |
| **A04 Insecure Design** | No server-side logic or user data; threat surface is limited to client-side behavior and dependencies. |
| **A05 Security Misconfiguration** | (1) CSP, X-Content-Type-Options, and Referrer-Policy set in built `index.html`. (2) Dependencies kept up to date; `npm audit` run in CI. |
| **A06 Vulnerable and Outdated Components** | `npm run audit` (and optional `npm audit` in CI) to detect known vulnerabilities. Lockfile committed for reproducible installs. |
| **A07 Identification and Authentication Failures** | N/A — no authentication. |
| **A08 Software and Data Integrity Failures** | No external script tags; fonts loaded from known CDNs. Lockfile and CI ensure reproducible builds. |
| **A09 Security Logging and Monitoring** | N/A for static site. No server or user data to log. |
| **A10 SSRF** | N/A — no server-side requests. |

## Running security checks locally

- **Tests (include safe-rendering checks):** `npm run test`
- **Dependency audit:** `npm run audit` or `npm audit --audit-level=high`

## Reporting a vulnerability

If you believe you’ve found a security issue, please open a GitHub issue or contact the maintainers privately so it can be addressed before public disclosure.
