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

## umi

版本为 umi@3，即 3 版本

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
