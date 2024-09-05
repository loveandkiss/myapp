import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { PageLoading, SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import defaultSettings from '../config/defaultSettings';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';


// console.log(' process.env', process.env)
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/**
 * 获取用户信息比较慢的时候会展示一个 loading
 * */
export const initialStateConfig = {
  loading: <PageLoading />,
};

console.log(`%c--------app.tsx--------`, 'color: red; font-size: 26px');

/**
 * 全局初始状态
 * Partial<> 是 TypeScript 中的一个工具类型，它表示 LayoutSettings 类型的所有属性都是可选的。
 * fetchUserInfo 为可选属性，类型是一个函数，该函数不接受参数，返回一个 Promise，该 Promise 解析为 API.CurrentUser 类型或 undefined。这似乎是一个用于异步获取用户信息的函数。
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  // 异步获取用户信息
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      return msg.data;
    } catch (error) {
      // 前往登录页面
      history.push(loginPath);
    }
    return undefined;
  };

  // 如果不是登录页面，执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
// 运行时布局配置
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  console.log('::layout::', initialState)
  return {
    // 常用属性
    // 默认布局调整
    rightContentRender: () => <RightContent />,
    // 控制内容区域的边距。
    disableContentMargin: false,
    // 水印属性
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    // 自定义页面的页脚部分
    footerRender: () => <Footer />,
    // 页面变化时的回调函数
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      // 检查用户是否已登录。如果未登录且当前路径不是登录页，则会重定向到登录页。
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    // 在布局中显示额外的链接。
    links: isDev
      ? [
        <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
          <LinkOutlined />
          <span>OpenAPI 文档</span>
        </Link>,
        <Link to="/~docs" key="docs">
          <BookOutlined />
          <span>业务组件文档</span>
        </Link>,
      ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};
