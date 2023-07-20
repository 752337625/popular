import { resolve } from 'node:path';
import type { UserConfig, ConfigEnv } from 'vite';
import { defineConfig, mergeConfig, loadEnv } from 'vite';
import { readPackageJSON } from 'pkg-types';
import { createVitePlugins } from '../plugins';
import { commonConfig } from './common';
import { wrapperEnv } from '../utils/env';

import dayjs from 'dayjs';
interface DefineOptions {
  overrides?: UserConfig;
  options?: {};
}

function defineApplicationConfig(defineOptions: DefineOptions = {}) {
  const { overrides = {} } = defineOptions;
  return defineConfig(async ({ command, mode }: ConfigEnv): Promise<UserConfig> => {
    const root = process.cwd();
    const isBuild = command === 'build';
    const env = loadEnv(mode, root);
    const viteEnv = wrapperEnv(env);
    const pathResolve = (pathname: string) => resolve(root, '.', pathname);
    const applicationConfig: UserConfig = {
      resolve: {
        alias: [
          {
            find: 'vue-i18n',
            replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
          },
          // /@/xxxx => src/xxxx
          {
            find: /\/@\//,
            replacement: pathResolve('src') + '/',
          },
          // /#/xxxx => types/xxxx
          {
            find: /\/#\//,
            replacement: pathResolve('types') + '/',
          },
          // @/xxxx => src/xxxx
          {
            find: /@\//,
            replacement: pathResolve('src') + '/',
          },
          // #/xxxx => types/xxxx
          {
            find: /#\//,
            replacement: pathResolve('types') + '/',
          },
        ],
      },
      define: createDefineData(root),
      build: {
        target: 'es2015',
        cssTarget: 'chrome61',
        sourcemap: isBuild ? false : 'inline',
        assetsInlineLimit: 0, //禁止将文件转base64
        // minify: 'terser',
        // terserOptions: {
        //   compress: {
        //     drop_console: true,
        //     drop_debugger: true,
        //     pure_funcs: ['console.log', 'debugger'],
        //   },
        //   format: {
        //     comments: false,
        //   },
        // },
        rollupOptions: {
          output: {
            // 入口文件名
            entryFileNames: 'js/[name]-[hash].js',
            chunkFileNames: 'js/[name]-[hash].js',
            assetFileNames: '[ext]/[name]-[hash].[ext]', // 图片、css等
            // 通过() => import()形式加载的组件会自动分包，第三方插件需手动分包
            manualChunks: {
              vue: ['vue'],
              pinia: ['pinia'],
              vueRouter: ['vue-router'],
              elementIcons: ['@element-plus/icons-vue'],
            },
          },
        },
      },
      css: {
        preprocessorOptions: {
          less: {
            // modifyVars: generateModifyVars(),
            modifyVars: {},
            // charset: false,
            // additionalData: `@import "./src/design/color.less"; @import "./src/design/mixin.less";`,
            javascriptEnabled: true,
          },
        },
      },
      plugins: createVitePlugins(viteEnv, isBuild),
    };
    const mergedConfig = mergeConfig(commonConfig(mode), applicationConfig);
    return mergeConfig(mergedConfig, overrides);
  });
}
async function createDefineData(root: string) {
  try {
    const pkgJson = await readPackageJSON(root);
    const { dependencies, devDependencies, name, version } = pkgJson;

    const __APP_INFO__ = {
      pkg: { dependencies, devDependencies, name, version },
      lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    };
    return {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    };
  } catch (error) {
    return {};
  }
}

export { defineApplicationConfig };
