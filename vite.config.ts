import react from '@vitejs/plugin-react';
import type { Plugin } from 'vite';
import { defineConfig } from 'vite';

// GitHub Pages serves project sites at https://<user>.github.io/<repo>/
const base = '/';
/** Injects OWASP-aligned security meta tags into built index.html only (no impact on dev). */
function securityHeaders(): Plugin {
  const securityMeta = [
    { httpEquiv: 'Content-Security-Policy', content: "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'none'" },
    { httpEquiv: 'X-Content-Type-Options', content: 'nosniff' },
    { name: 'referrer', content: 'strict-origin-when-cross-origin' },
  ];
  const tags = securityMeta
    .map((m) => {
      const r = m as Record<string, string>;
      const attr = r.httpEquiv ? 'http-equiv' : 'name';
      const val = r.httpEquiv || r.name || '';
      return `<meta ${attr}="${val}" content="${r.content}">`;
    })
    .join('\n  ');
  return {
    name: 'security-headers',
    transformIndexHtml(html, ctx) {
      if (!ctx.bundle) return html; // only in production build
      const insert = '</head>';
      if (html.includes(insert)) return html.replace(insert, `  ${tags}\n${insert}`);
      return html;
    },
  };
}

export default defineConfig({
  plugins: [react(), securityHeaders()],
  base,
  root: '.',
  build: {
    rollupOptions: {
      input: 'index.html',
    },
  },
});
