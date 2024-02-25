import { FunctionComponent } from 'react';
import classes from './Estimation.module.scss';

interface NotificationsProps {
  prop?: null;
}

const Notifications: FunctionComponent<NotificationsProps> = () => {
  return <div className={classes.root}>Страница ОЦЕНКИ находится в процессе разработки</div>;
};

export default Notifications;
