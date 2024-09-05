## 说明

- config.ts 是项目的主要配置文件，它包含了全局的配置选项，这些选项会在开发和生产环境下共享。
- config.dev.ts 是开发环境下的特定配置文件。它用于覆盖 config.ts 中的配置选项，以适应开发过程中的特殊需求。



## 路由

在 Umi 中，应用都是单页应用，页面地址的跳转都是在浏览器端完成的，不会重新请求服务端获取 html，html 只在应用初始化时加载一次。所有页面由不同的组件构成，页面的切换其实就是不同组件的切换，你只需要在配置中把不同的路由路径和对应的组件关联上。

### 配置路由
在配置文件中通过 routes 进行配置，格式为路由信息的数组。
比如：

```ts
export default {
  routes: [
    { exact: true, path: '/', component: 'index' },
    { exact: true, path: '/user', component: 'user' },
  ],
}
```

path 可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。

如果指向 src 目录的文件，可以用 @，也可以用 ../。比如 component: '@/layouts/basic'，或者 component: '../layouts/basic'，推荐用前者。