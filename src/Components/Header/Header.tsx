import { BellOutlined, CarOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { FC } from 'react';
import { selectUser } from '@state/user/selectors';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classes from './Header.module.scss';
import cn from 'classnames';

interface NavigationItem {
  path: string;
  label: string;
  Icon: React.ElementType;
}

interface IProps {
  currentPage: string;
  pathname?: string;
}

const navigationItems: NavigationItem[] = [
  { path: '/notifications', label: 'Уведомления', Icon: BellOutlined },
  { path: '/settings', label: 'Настройки', Icon: SettingOutlined },
  { path: '/login', label: 'Авторизация', Icon: UserOutlined },
];

const Header: FC<IProps> = ({ currentPage, pathname }) => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  return (
    <div className={classes.root}>
      <div className={classes.root__logo} onClick={() => navigate('/home')}>
        <CarOutlined />
        BuyCar
      </div>
      <div className={classes.root__currentPage}>{currentPage}</div>
      <div className={classes.root__buttonsBlock}>
        {navigationItems.map((item) => (
          <div
            key={item.path}
            className={cn(
              classes.root__logo,
              pathname === item.path && classes.root__logo__active,
              item.path === '/login' && !user && classes.root__logo__notAuthorized,
            )}
            onClick={() => navigate(item.path)}
          >
            <item.Icon />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
