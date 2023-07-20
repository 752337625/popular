export default {
  root: true,
  parser: 'vue-eslint-parser', //vue-eslint-parser
  parserOptions: {
    parser: '@typescript-eslint/parser' /* 解析ts语法 */,
    ecmaVersion: 2020,
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      globalReturn: false,
      impliedStrict: false,
      jsx: true,
      tsx: true,
    },
  },
  globals: {
    defineOptions: 'readonly',
    // Web3: 'writable',
    // IDB: 'writable',
    // appPromptEvent: 'writable',
    // BeforeInstallPromptEvent: 'readonly',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  /**
   * plugins：定义了该eslint文件所依赖的插件
   * prettier->eslint-plugin-prettier
   * @typescript-eslint->@typescript-eslint/eslint-plugin
   * vue->eslint-plugin-vue
   * import->eslint-plugin-import
   */
  plugins: ['vue', '@typescript-eslint', 'import', 'prettier'],
  /**
   * extends：定义文件集成子规则
   * eslint:recommended 启动eslint默认规则 在vue-vben-admin 项目中没有对当前插件进行添加。如果添加进去就会造成默认规则开启.
   * 但是我们可以对指定的一些规则在rules进行添加 例如：'no-var': 'error', //禁止使用var。当前项目添加默认规则。
   * prettier->eslint-config-prettier 避免与eslint规则冲突，提高prettier规则权重
   * plugin:vue/vue3-recommended->eslint-plugin-vue
   * plugin:@typescript-eslint/recommended->@typescript-eslint/eslint-plugin
   * eslintrc-auto-import.json 文件默认在根目录，可以在pulgin->index.ts 文件中修改位置 './eslintrc-auto-import.json'
   */
  extends: [
    'plugin:vue/vue3-recommended', //添加plugin
    'plugin:@typescript-eslint/recommended', //添加plugin
    'plugin:prettier/recommended', //添加plugin
  ],
  rules: {
    //发现一个问题，规则顺序也会影响校验。例如：@typescript-eslint/no-unused-vars放到no-unused-vars 后面
    /**
     * @typescript-eslint
     */
    '@typescript-eslint/ban-ts-comment': 'off', //允许添加ts注释
    '@typescript-eslint/no-var-requires': ['off'], //解决requires异常
    '@typescript-eslint/no-explicit-any': ['off'], //解决ts无法使用any异常
    '@typescript-eslint/ban-types': ['off'], //解决error  Don't use `{}` as a type. `{}` actually means "any non-nullish value".
    '@typescript-eslint/no-empty-function': 'error', // 空函数异常警告开启
    '@typescript-eslint/no-use-before-define': 'error', // 使用前先定义
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ], //参数，变量未使用报错，注意由于@typescript-eslint/no-unused-vars、no-unused-vars配置顺序问题 .d.ts不会产生校验，如果更改俩个规则的顺序会出现eslint提示
    /**
     * eslint:recommended
     */
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'no-debugger': 'off', //打开debugger
    'no-useless-escape': 'off', //正则检测关闭，很难解决正则问题
    'no-var': 'error', //禁止使用var
    eqeqeq: 'error', //要求使用 === 和 !==
    'no-irregular-whitespace': 'error', //这禁止掉 空格报错检查
    'no-use-before-define': 'error', // 未声明前不能使用
    'space-before-function-paren': 'off', //函数空格问题，
    'prettier/prettier': 'off',

    /**
     * vue
     */

    'vue/no-deprecated-slot-attribute': 'off', // 默认 默认指定使用v-solt，但是element中有类似<span slot="footer" class="dialog-footer">
    'vue/custom-event-name-casing': 'error', //emitDefine接受事件名称限制采用默认驼峰
    'vue/script-setup-uses-vars': 'error', // 解决 注意该script非ts表示<script setup>中定义变量在<template>使用no-unused-vars问题
    'vue/valid-template-root': 'error', //<template> </template>在没有子元素下不异常，
    'vue/no-mutating-props': 'error', //eslint不建议子元素通过v-model修改父元素传的props值
    'vue/attributes-order': 'error', //vue模板中属性顺序
    'vue/one-component-per-file': 'off',
    'vue/html-closing-bracket-newline': 'off', //html闭合折行问题
    'vue/max-attributes-per-line': 'off', //取消属性独占一行的设定
    'vue/multiline-html-element-content-newline': 'off',
    'vue/singleline-html-element-content-newline': 'off', //vue html 折行问题忽略
    'vue/attribute-hyphenation': 'off',
    'vue/require-default-prop': 'off',
    'vue/require-explicit-emits': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/multi-word-component-names': 'off', // 取消对vue组件的强制name命名,在使用setup糖语法情况下不适用
  },
  //覆盖某些文件的eslint规则
  // overrides: [
  // 	{
  // 		files: ['bin/*.js', 'lib/*.js'],
  // 		excludedFiles: '*.test.js',
  // 		rules: {
  // 			quotes: ['error', 'single'],
  // 		},
  // 	},
  // ],
};
