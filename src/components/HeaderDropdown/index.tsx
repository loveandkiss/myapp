import { Dropdown } from 'antd';
// 类型
import type { DropDownProps } from 'antd/es/dropdown';
import classNames from 'classnames';
import React from 'react';
import styles from './index.less';

// 1. Omit 类型工具可以用来创建一个新类型，该类型是原始类型 T 的一个子集，其中排除了指定的属性 K。
export type HeaderDropdownProps = {
  overlayClassName?: string;
  overlay: React.ReactNode | (() => React.ReactNode) | any;
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'bottomCenter';
} & Omit<DropDownProps, 'overlay'>;

// 2. 定义函数式组件
const HeaderDropdown: React.FC<HeaderDropdownProps> = ({ overlayClassName: cls, ...restProps }) => {
  // console.log('===restProps===', restProps);
  return <Dropdown overlayClassName={classNames(styles.container, cls)} {...restProps} />;
};

// 3. 导出组件
export default HeaderDropdown;
