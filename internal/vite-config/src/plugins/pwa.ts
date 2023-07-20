import { VitePWA } from 'vite-plugin-pwa';
export function configPwaConfig(env) {
  const { VITE_GLOB_APP_TITLE, VITE_GLOB_APP_SHORT_NAME } = env;
  const pwaPlugin = VitePWA({
    manifest: {
      name: VITE_GLOB_APP_TITLE,
      short_name: VITE_GLOB_APP_SHORT_NAME,
      icons: [
        {
          src: './pwa/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: './pwa/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
  });
  return pwaPlugin;
}
