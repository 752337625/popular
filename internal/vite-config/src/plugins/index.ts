// import path from 'path';
import { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
// import Mkcert from 'vite-plugin-mkcert'; // success 提供有效的https证书
import Legacy from '@vitejs/plugin-legacy'; // success
import { configHtmlPlugin } from './html'; // success
import { configMockPlugin } from './mock';
import { configPwaConfig } from './pwa'; // success
import { configSvgIconsPlugin } from './svgSprite'; // 将svg转为组件 success
import { configCompressPlugin } from './compress'; // success
import { configVisualizerConfig } from './visualizer'; // success
import WindiCSS from 'vite-plugin-windicss'; // success
//最常用的场景就是监听 vite.config.js 和 .env.development 文件，
//我们知道，修改 vite 配置文件和环境配置文件，是需要重启 vite 才会生效，通过这个插件，我们将从反复重启中解脱出来。
import viteRestart from 'vite-plugin-restart';
import Vuejsx from '@vitejs/plugin-vue-jsx';
import PurgeIcons from 'vite-plugin-purge-icons';
import { configStyleImportPlugin } from './styleImport';
//vite-plugin-dts 插件来实现打包时自动生成类型声明文件
import dts from 'vite-plugin-dts';
export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_USE_LEGACY, VITE_BUILD_COMPRESS, VITE_USE_PWA, VITE_USE_MOCK } = viteEnv;
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue({
      template: {
        compilerOptions: {
          // 将所有带短横线的标签名都视为自定义元素
          isCustomElement: tag => /^micro-app/.test(tag),
        },
      },
    }),
    Vuejsx(),
    viteRestart({
      restart: ['.env', '.env.development', 'vite.config.ts'],
    }),
    dts({ logLevel: 'error', insertTypesEntry: true, copyDtsFiles: false }),
    // Banner(
    //   `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: ${pkg.description}\n * author: ${pkg.author.name}\n * homepage: ${pkg.homepage}\n */`,
    // ),
  ];
  // vite-plugin-purge-icons
  vitePlugins.push(PurgeIcons());
  // vite-plugin-windicss
  vitePlugins.push(WindiCSS());
  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));
  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild));
  // rollup-plugin-visualizer
  vitePlugins.push(configVisualizerConfig());
  // vite-plugin-style-import
  vitePlugins.push(configStyleImportPlugin());
  // vite-plugin-mock
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));
  // vitejs/plugin-legacy
  VITE_USE_LEGACY &&
    vitePlugins.push(
      Legacy({
        targets: ['chrome 52'],
      }),
    );
  // vite-plugin-compression
  isBuild && VITE_BUILD_COMPRESS && vitePlugins.push(configCompressPlugin(viteEnv));
  // vite-plugin-pwa
  isBuild && VITE_USE_PWA && vitePlugins.push(configPwaConfig(viteEnv));
  // vite-plugin-imagemin
  // isBuild && VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin());s
  return vitePlugins;
}
