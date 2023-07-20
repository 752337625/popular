import type { PluginOption } from 'vite';
import compressPlugin from 'vite-plugin-compression';
export function configCompressPlugin(env: ViteEnv): PluginOption | PluginOption[] {
  const { VITE_BUILD_COMPRESS_TYPE, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = env;
  const compressList = VITE_BUILD_COMPRESS_TYPE.split(',');
  const plugins: PluginOption[] = [];
  if (compressList.includes('gzip')) {
    plugins.push(
      compressPlugin({
        ext: '.gz',
        deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
      }),
    );
  }
  if (compressList.includes('brotli')) {
    plugins.push(
      compressPlugin({
        ext: '.br',
        algorithm: 'brotliCompress',
        deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
      }),
    );
  }
  return plugins;
}
