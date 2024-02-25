import { BellOutlined, CarOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import classes from './Header.module.scss';
import { useSelector } from 'react-redux';
import { selectUser } from '@state/user/selectors';

interface IProps {
  currentPage: string;
}

const Header: FC<IProps> = ({ currentPage }) => {
  const navigate = useNavigate();

  const user = useSelector(selectUser);

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
        <div
          className={cn(classes.root__logo, !user ? classes.root__logo__notAuthorized : undefined)}
          onClick={goToLogin}
        >
          <UserOutlined />
        </div>
      </div>
    </div>
  );
};

export default Header;
