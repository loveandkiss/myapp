import { PageContainer } from '@ant-design/pro-components';
// UI组件
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Alert, Card, Typography, Button, Dropdown } from 'antd';
import React, { useState } from 'react';
// 国际化
import { FormattedMessage, useIntl } from 'umi';
import styles from './index.less';

// 组件
const CodePreview: React.FC = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

// 组件
const Welcome: React.FC = () => {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 2000);
  // 获取 intl 对象
  const intl = useIntl();

  return (
    <PageContainer ghost>
      <Card
        title="Default size card"
        hoverable
        loading={loading}
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Alert
          message={intl.formatMessage({
            id: 'pages.welcome.alertMessage',
            defaultMessage: 'Faster and stronger heavy-duty components have been released.',
          })}
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 24,
          }}
        />
        <Typography.Text strong>
          <a
            href="https://procomponents.ant.design/components/table"
            rel="noopener noreferrer"
            target="__blank"
          >
            <FormattedMessage id="pages.welcome.link" defaultMessage="Welcome" />
          </a>
        </Typography.Text>
        <CodePreview>yarn add @ant-design/pro-components</CodePreview>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
