import { FunctionComponent } from 'react';
import classes from './Notifications.module.scss';
import { Button, Select, Switch } from 'antd';

interface NotificationsProps {
  prop?: null;
}

const NotificationRow = ({
  title,
  email,
  push,
  howOften = '3ч',
  ...props
}: {
  title: string;
  email: boolean;
  push: boolean;
  howOften?: string;
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px',
        backgroundColor: '#f0f0f0',
        padding: '0 20px',
        borderRadius: '20px',
        width: '90%',
      }}
    >
      <h5>{title}</h5>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Select defaultValue={howOften} style={{ width: 70 }} size="large" />
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Switch defaultChecked={email} />
          <>&nbsp;По почте</>
          <Switch defaultChecked={push} />
          <>&nbsp;Push</>
        </div>
        <Button size="large">Отключить на 24 часа</Button>
        <Button size="large">Прейти к фильтру</Button>
        <Button size="large" danger>
          Удалить
        </Button>
      </div>
    </div>
  );
};

const Notifications: FunctionComponent<NotificationsProps> = () => {
  return (
    <div className={classes.root}>
      <NotificationRow title="1. Daewoo Nexia до 250 000 руб." email push={false} />
      <NotificationRow title="2. Geely Coolray до 1 500 000 руб." email push howOften="1ч" />
      <NotificationRow title="3. Chevrolet Cobalt от 2019 года" email={false} push howOften="24ч" />
    </div>
  );
};

export default Notifications;
