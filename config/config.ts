// https://umijs.org/config/
import { defineConfig } from 'umi';
import { join } from 'path';

import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;

console.log('REACT_APP_ENV', REACT_APP_ENV);

export default defineConfig({
  // 这个选项启用了文件名的哈希值，通常用于解决浏览器缓存问题，确保文件更新后浏览器能够获取新版本。
  hash: true,
  // 整合 antd 组件库
  antd: {},
  // 打开 Umi 内置的 dva 插件 => 状态管理
  dva: {
    hmr: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  // 配置国际化插件
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // 默认使用 src/locales/zh-CN.ts 作为多语言文件
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
    // baseSeparator: '-',
  },
  // 是否启用按需加载，即是否把构建产物进行拆分，在需要的时候下载额外的 JS 再执行。
  // 默认关闭时，只生成一个 js 和一个 css，即 umi.js 和 umi.css。优点是省心，部署方便；缺点是对用户来说初次打开网站会比较慢。
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  // 配置需要兼容的浏览器最低版本，会自动引入 polyfill 和做语法转换。
  // Default: { chrome: 49, firefox: 64, safari: 10, edge: 13, ios: 10 }
  // 配置的 targets 会和合并到默认值，不需要重复配置
  targets: {
    ie: 11,
  },
  // 配置路由
  // umi routes: https://umijs.org/docs/routing
  routes,
  access: {},
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // 如果不想要 configProvide 动态设置主题需要把这个设置为 default
    // 只有设置为 variable， 才能使用 configProvide 动态设置主色调
    // https://ant.design/docs/react/customize-theme-variable-cn
    'root-entry-name': 'variable',
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  // 忽略了Moment.js的本地化配置。
  ignoreMomentLocale: true,
  // 配置代理能力
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  // 在具体的开发中，联调永远都是比较麻烦的事情，尤其是前后端分离之后，后端一般都需要维护一份文档来告诉我们具体的 API 有什么功能，具体的字段信息，这些信息的维护成本还是相当高的。
  openAPI: [
    {
      requestLibPath: "import { request } from 'umi'",
      // 或者使用在线的版本
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from 'umi'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
  // 设置 node_modules 目录下依赖文件的编译方式。
  nodeModulesTransform: { type: 'none' },
  mfsu: {},
  webpack5: {},
  exportStatic: {},
});
