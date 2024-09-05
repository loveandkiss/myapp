# Ant Design Pro

This project is initialized with [Ant Design Pro](https://pro.ant.design). Follow is the quick guide for how to use.

## Environment Prepare

Install `node_modules`:

```bash
npm install
```

or

```bash
yarn
```

## Provided Scripts

Ant Design Pro provides some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script:

### Start project

```bash
npm start
```

### Build project

```bash
npm run build
```

### Check code style

```bash
npm run lint
```

You can also use script to auto fix some lint error:

```bash
npm run lint:fix
```

### Test code

```bash
npm test
```

## More

You can view full document on our [official website](https://pro.ant.design). And welcome any feedback in our [github](https://github.com/ant-design/ant-design-pro).



## umi 【使用参考官方文档】

版本为 umi@3，即 3 版本

https://v3.umijs.org/zh-CN/docs/runtime-config





## 国际化

- 国际化插件采用约定式目录结构，我们约定在 src/locales 目录下引入多语言文件。
- 多语言文件的命名需遵循此规范：<lang><separator><COUNTRY>.(js|json|ts)。其中，<separator> 为分隔符，默认为 -，可以通过 baseSeparator 项配置。例如，如果您需要在项目中引入简体中文和英文的多语言支持，可以在 src/locales 目录下创建 zh-CN.ts 和 en-US.ts 两个文件：

```
src
  + locales
    + zh-CN.ts
    + en-US.ts
  pages

```

- 现在，添加您的第一条多语言内容：

```js
// src/locales/zh-CN.ts
export default {
  welcome: '欢迎光临 Umi 的世界！',
};
```

```js
// src/locales/en-US.ts
export default {
  welcome: "Welcome to Umi's world!",
};
```

- 您也可以使用 .json 文件来存放多语言的内容：

```json
// src/locales/zh-CN.json
{
  "welcome": "欢迎光临 Umi 的世界！",
};
```

```json
// src/locales/en-US.json
{
  "welcome": "Welcome to Umi's world!",
};
```

- 一切就绪，现在您可以在 Umi 中使用多语言内容。交给我们的 <FormattedMessage /> 组件吧，只需要将前面的 welcome 作为参数 id 的值传入即可：

```js
import { FormattedMessage } from 'umi';

export default function Page() {
  return (
    <div>
      <FormattedMessage id="welcome" />
    </div>
  );
}
```

渲染的结果如下：

```html
<!-- zh-CN -->
<div>欢迎光临 Umi 的世界！</div>

<!-- en-US -->
<div>Welcome to Umi's world!</div>
```

- 在组件的参数中使用在某些情况下，您需要将多语言内容作为参数传递给某个组件。可以通过 intl 对象来实现：

```js
import { Alert } from 'antd';
import { useIntl } from 'umi';

export default function Page() {
  const intl = useIntl();
  const msg = intl.formatMessage({
    id: 'welcome',
  });

  return <Alert message={msg} type="success" />;
}
```

## antd

版本为 4.20.0

## umi 的 request

```js
import { request, useRequest } from 'umi';

// request;
// useRequest;
```

- request 接收的 options 除了透传 axios 的所有 config 之外，我们还额外添加了几个属性 skipErrorHandler，getResponse，requestInterceptors 和 responseInterceptors 。

```js
import { request } from 'umi';

request('/api/user', {
  params: { name : 1 },
  timeout: 2000,
  // other axios options
  skipErrorHandler: true,
  getResponse: false,
  requestInterceptors: [],
  responseInterceptors: [],
}

```

## umi 的数据流

- 全局初始状态 @umi/max 内置了全局初始状态管理插件，允许您快速构建并在组件内获取 Umi 项目全局的初始状态。
- 全局初始状态是一种特殊的 Model。
- 全局初始状态在整个 Umi 项目的最开始创建。编写 src/app.ts 的导出方法 getInitialState()，其返回值将成为全局初始状态。例如：

```js
// src/app.ts
import { fetchInitialData } from '@/services/initial';

export async function getInitialState() {
  const initialData = await fetchInitialData();
  return initialData;
}
```

- 现在，各种插件和您定义的组件都可以通过 useModel('@@initialState') 直接获取到这份全局的初始状态，如下所示：

```js
import { useModel } from 'umi';

export default function Page() {
  const { initialState, loading, error, refresh, setInitialState } = useModel('@@initialState');
  return <>{initialState}</>;
}
```

## Ant Design Pro 配置

- 运行时配置【https://v3.umijs.org/zh-CN/docs/runtime-config】

运行时配置和配置的区别是他跑在浏览器端，基于此，我们可以在这里写函数、jsx、import 浏览器端依赖等等，注意不要引入 node 依赖。


约定 src/app.tsx 为运行时配置。


在构建时是无法使用 dom 的，所以有些配置可能需要运行时来配置，一般而言我们都是在 src/app.tsx 中管理运行时配置。

getInitialState

getInitialState 用于获取初始化数据，初始化数据使用 useModel 在各个组件中使用，在请求中 getInitialState 会堵塞页面加载。

```js
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  currentUser?: API.CurrentUser,
}> {
  // 如果是登录页面，不执行
  const currentUser = await fetchUserInfo();
  return {
    currentUser,
  };
}
```

initialStateConfig

initialStateConfig 是 getInitialState 的补充配置，getInitialState 支持异步的设置，在初始化没有完成之前我们展示了一个 loading，initialStateConfig 可以配置这个 loading。

```js
/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};
```

layout

在构建时是无法使用 dom 的，所以有些配置可能需要运行时来配置，我们可以在 src/app.tsx 中 export 一个 layout 来进行配置：

```js
import React from 'react';
import { RunTimeLayoutConfig } from 'umi';
import { BasicLayoutProps, Settings as LayoutSettings } from '@ant-design/pro-layout';

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      console.log(location.pathname);
    },
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
    childrenRender: (children) => {
      return <div>{children}</div>;
    },
  };
};
```

layout 支持一个 function，可以与 initialState 结合使用，将动态数据放入 initialState 中每次 initialState 变化都会触发更新。

## ProComponents

ProComponents 是基于 Ant Design 而开发的模板组件，提供了更高级别的抽象支持，开箱即用。可以显著的提升制作 CRUD 页面的效率，更加专注于页面。

安装

```shell

$ npm i @ant-design/pro-components --save

```

在项目中使用

```js
import React from 'react';
import { ProForm, ProFormText } from '@ant-design/pro-components';

export default () => {
  return (
    <ProForm
      onFinish={async (values) => {
        console.log(values);
      }}
    >
      <ProFormText name="name" label="姓名" />
    </ProForm>
  );
};
```

- ProDescriptions





###  husky 
版本 7.0.4
husky 是一个用于简化Git钩子（hooks）的设置的工具，允许开发者轻松地在各种Git事件触发时运行脚本。例如，在提交之前（pre-commit）、推送之前（pre-push）、或者在提交信息被写入后（commit-msg）等。

husky的使用可以提高项目团队的工作效率，确保代码库中的代码符合特定的质量标准。它通常与lint-staged一起使用，以在提交前自动执行代码的静态检查。


### lint-staged

lint-staged 是一个在提交代码之前运行linter或其他工具的工具。这意味着当开发人员尝试提交代码到版本控制系统（如git）时，lint-staged 会只对暂存区（staged files）的文件运行配置的命令，这通常是代码风格检查器（如ESLint、Prettier）、代码格式化工具或测试套件。



### umi-fabric[https://github.com/umijs/fabric]


一个包含 prettier，eslint，stylelint 的配置文件合集

```bash

npm i @umijs/fabric --save-dev
yarn add @umijs/fabric -D


```


in .eslintrc.js


```js

module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],

  // in antd-design-pro
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
  },

  rules: {
    // your rules
  },
};

```


in .stylelintrc.js


```js

module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/stylelint')],
  rules: {
    // your rules
  },
};



```

in .prettierrc.js

```js

const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.prettier,
};


```


## Node 版本 和 NPM 版本

Node版本 => v16.2.0
NPM版本  => 7.13.0


## 本系统为一个后台管理系统














