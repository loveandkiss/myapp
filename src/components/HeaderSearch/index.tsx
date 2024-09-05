// icons
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { AutoComplete, Input } from 'antd';
// antd
import type { AutoCompleteProps } from 'antd/es/auto-complete';
/**
 * classNames 是一个常用的 JavaScript 库，通常与 React 或其他前端框架一起使用，用于处理 CSS 类名的动态生成和组合。
 * 它可以帮助你更方便地管理组件的样式，特别是当你需要在不同状态下应用不同的 CSS 类名时。
 */
import classNames from 'classnames';

/**
 * rc-util 是一个 JavaScript 库，通常与 React 组件开发相关，它提供了一些实用的工具函数和组件，以帮助开发者更轻松地构建 React 应用。
 * 这个库包含了一系列常用的实用函数，用于处理状态管理、事件处理、DOM 操作和其他常见的前端任务。
 */
import useMergedState from 'rc-util/es/hooks/useMergedState';
import React, { useRef } from 'react';
import styles from './index.less';

console.log('styles', styles);

export type HeaderSearchProps = {
  onSearch?: (value?: string) => void;
  onChange?: (value?: string) => void;
  onVisibleChange?: (b: boolean) => void;
  className?: string;
  placeholder?: string;
  options: AutoCompleteProps['options'];
  defaultVisible?: boolean;
  visible?: boolean;
  defaultValue?: string;
  value?: string;
};

// 搜索
const HeaderSearch: React.FC<HeaderSearchProps> = (props) => {
  const {
    className,
    defaultValue,
    onVisibleChange,
    placeholder,
    visible,
    defaultVisible,
    ...restProps
  } = props;

  const inputRef = useRef<InputRef | null>(null);

  // 自动完成
  const [value, setValue] = useMergedState<string | undefined>(defaultValue, {
    value: props.value,
    onChange: props.onChange,
  });

  // 是否展示输入框
  // 创建一个名为 searchMode 的状态，该状态初始值是 defaultVisible 或 false，并且可以通过 props.visible 和 onVisibleChange 来更新。
  // 1. value 参数是 useMergedState 钩子函数中的一个配置选项，用于关联外部值（通常是来自组件的 props）与内部状态。它的作用是将外部值与内部状态进行关联，以确保它们保持同步。
  // 这意味着当 props.visible 发生变化时，searchMode 也会相应地更新为 props.visible 的值。
  // 这种模式通常用于实现受控组件，其中组件的状态是由外部属性（props）来控制的。通过将 value 设置为来自 props 的值，你可以确保当外部属性 props.visible 发生变化时，searchMode 内部状态也会自动更新以反映这些变化。
  // 举个例子，如果 props.visible 的值在组件渲染过程中改变了，searchMode 的值会自动更新，而不需要手动调用 setSearchMode 来同步这两者。
  // 2. onChange 参数是 useMergedState 钩子函数中的另一个配置选项，用于指定当内部状态发生变化时要执行的回调函数。它的作用是定义状态变化时的响应行为，通常用于更新外部状态或执行其他与状态变化相关的操作。
  // 当 searchMode 内部状态发生变化时，将调用 onVisibleChange 函数。这个函数通常会由组件的使用者（父组件或其他上层组件）提供，并用于处理状态变化所需的逻辑。
  const [searchMode, setSearchMode] = useMergedState(defaultVisible ?? false, {
    value: props.visible,
    onChange: onVisibleChange,
  });

  // 使用 classNames 来动态生成 CSS 类名，将其应用到你的元素上。
  const inputClass = classNames(styles.input, {
    [styles.show]: searchMode,
  });

  return (
    <div
      className={classNames(className, styles.headerSearch)}
      onClick={() => {
        setSearchMode(true);
        if (searchMode && inputRef.current) {
          // 聚焦
          inputRef.current.focus();
        }
      }}
      onTransitionEnd={({ propertyName }) => {
        if (propertyName === 'width' && !searchMode) {
          if (onVisibleChange) {
            onVisibleChange(searchMode);
          }
        }
      }}
    >
      <SearchOutlined
        key="Icon"
        style={{
          cursor: 'pointer',
        }}
      />
      <AutoComplete
        key="AutoComplete"
        className={inputClass}
        value={value}
        options={restProps.options}
        onChange={(completeValue) => {
          setValue(completeValue);
        }}
      >
        <Input
          size="small"
          ref={inputRef}
          defaultValue={defaultValue}
          aria-label={placeholder}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (restProps.onSearch) {
                restProps.onSearch(value);
              }
            }
          }}
          onBlur={() => {
            setSearchMode(false);
          }}
        />
      </AutoComplete>
    </div>
  );
};

export default HeaderSearch;
