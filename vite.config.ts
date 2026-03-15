import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// GitHub Pages serves project sites at https://<user>.github.io/<repo>/
// Set base to your repo name with leading and trailing slashes.
const base = process.env.GITHUB_PAGES === 'true' ? '/ohtocode/' : '/';

export default defineConfig({
  plugins: [react()],
  base,
  root: '.',
  build: {
    rollupOptions: {
      input: 'index.html',
    },
  },
});
