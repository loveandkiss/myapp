export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    // 配置菜单的 name，如果配置了国际化，name 为国际化的 key。
    name: 'admin',
    // 配置菜单的图标，默认使用 antd 的 icon 名，默认不适用二级菜单的 icon。
    icon: 'crown',
    // 权限配置，需要预先配置权限
    // access: 'canAdmin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'list.table-list',
    // 配置菜单的图标，默认使用 antd 的 icon 名，默认不适用二级菜单的 icon。
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
