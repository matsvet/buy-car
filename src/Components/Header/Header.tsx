import { BellOutlined, CarOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Header.module.scss';

type Props = {
  currentPage: string;
};

const Header: FC<Props> = ({ currentPage }) => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/home');
  };
  const goToNotifications = () => {
    navigate('/notifications');
  };
  const goToSettings = () => {
    navigate('/settings');
  };
  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className={classes.root}>
      <div className={classes.root__logo} onClick={goToHome}>
        <CarOutlined />
        BuyCar
      </div>
      <div className={classes.root__currentPage}>{currentPage}</div>
      <div className={classes.root__buttonsBlock}>
        <div className={classes.root__logo} onClick={goToNotifications}>
          <BellOutlined />
        </div>
        <div className={classes.root__logo} onClick={goToSettings}>
          <SettingOutlined />
        </div>
        <div className={classes.root__logo} onClick={goToLogin}>
          <UserOutlined />
        </div>
      </div>
    </div>
  );
};

export default Header;
