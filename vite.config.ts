import { defineApplicationConfig } from '@popular/vite-config';
export default defineApplicationConfig({
  overrides: {
    optimizeDeps: {},
    server: {
      proxy: {
        '/basic-api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          ws: true,
          rewrite: path => path.replace(new RegExp(`^/basic-api`), ''),
          // only https
          // secure: false
        },
        '/upload': {
          target: 'http://localhost:3300/upload',
          changeOrigin: true,
          ws: true,
          rewrite: path => path.replace(new RegExp(`^/upload`), ''),
        },
      },
    },
  },
});
