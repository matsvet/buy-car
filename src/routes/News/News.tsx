import { FunctionComponent } from 'react';
import classes from './News.module.scss';

interface NotificationsProps {
  prop?: null;
}

const Notifications: FunctionComponent<NotificationsProps> = () => {
  return <div className={classes.root}>Страница НОВОСТЕЙ находится в процессе разработки</div>;
};

export default Notifications;
