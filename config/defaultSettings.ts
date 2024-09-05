import { Settings as LayoutSettings } from '@ant-design/pro-components';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  // 设置标题的 title
  // 显示在布局左上角的产品名，默认值为包名。
  title: 'Ant Design Pro',
  // 修改左上角的 logo
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  navTheme: 'dark', // dark | light
  // 主题颜色
  primaryColor: '#ff6600', // 拂晓蓝 #1890ff
  layout: 'side', // side | top | mix
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false, // 色弱模式
  pwa: false,
  iconfontUrl: '',
};

export default Settings;
