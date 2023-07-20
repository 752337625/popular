import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import';
export function configStyleImportPlugin() {
  //按需导入element-plus的css样式  // 如果没有你需要的resolve，可以在lib内直接写，也可以给我们提供PR
  return createStyleImportPlugin({
    resolves: [ElementPlusResolve()],
    libs: [
      {
        libraryName: 'element-plus',
        esModule: true,
        resolveStyle: name => {
          return `./node_modules/element-plus/lib/theme-chalk/${name}.css`;
        },
      },
    ],
  });
}
