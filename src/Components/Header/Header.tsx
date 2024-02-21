import { Button } from 'antd';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Header.module.scss';

const Header: FC = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/home');
  };
  const goToLogin = () => {
    navigate('/login');
  };
  const goToSettings = () => {
    navigate('/settings');
  };

  return (
    <div className={classes.root}>
      <div className={classes.root__logo} onClick={goToHome}>
        BuyCar
      </div>
      <div className={classes.root__buttonsBlock}>
        <Button onClick={goToSettings}>Настройки</Button>
        <Button onClick={goToLogin}>Профиль</Button>
      </div>
    </div>
  );
};

export default Header;
