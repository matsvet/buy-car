import { FunctionComponent } from 'react';
import classes from './Notifications.module.scss';

interface NotificationsProps {
  prop?: null;
}

const Notifications: FunctionComponent<NotificationsProps> = () => {
  return <div className={classes.root}>Страница УВЕДОМЛЕНИЙ находится в процессе разработки</div>;
};

export default Notifications;
