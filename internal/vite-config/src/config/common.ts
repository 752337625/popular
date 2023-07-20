import type { UserConfig } from 'vite';
const commonConfig: (mode: string) => UserConfig = mode => ({
  server: {
    host: true,
  },
  esbuild: {
    drop: mode === 'procution' ? ['console', 'debugger'] : [],
  },
  json: {
    //namedExports: true,
    //stringify:true
  },
  build: {
    // 不同包zip大小
    reportCompressedSize: false,
    // chunk 大小警告的限制
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      // TODO: Prevent memory overflow
      maxParallelFileOps: 3,
    },
  },
});

export { commonConfig };
