import {
  AlignLeftOutlined,
  MoneyCollectOutlined,
  SearchOutlined,
  StarOutlined,
  SwapOutlined,
} from '@ant-design/icons';
import { Tooltip } from 'antd';
import { selectCarsReducer } from '@state/cars/selectors';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React, { FC, useMemo } from 'react';
import classes from './LeftSidebar.module.scss';
import cn from 'classnames';
import { selectFilterReducer } from '@state/filter/selectors';

interface NavigationItem {
  path: string;
  label: string;
  Icon: React.ElementType;
}

interface NavigationItemProps extends NavigationItem {
  isActive: boolean;
  disabled: boolean;
}

interface LeftSidebarProps {
  pathname?: string;
}

const navigationItems: NavigationItem[] = [
  { path: '/find-cars', label: 'Поиск', Icon: SearchOutlined },
  { path: '/favorite-cars', label: 'Избранное', Icon: StarOutlined },
  { path: '/compared-cars', label: 'Сравнение', Icon: SwapOutlined },
  { path: '/estimation', label: 'Оценить авто', Icon: MoneyCollectOutlined },
  { path: '/news', label: 'Новости', Icon: AlignLeftOutlined },
];

const NavigationItem: FC<NavigationItemProps> = ({ path, label, Icon, isActive }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (!isActive) navigate(path);
  };

  const { totalItems, favoriteCars, comparedCars } = useSelector(selectCarsReducer);
  const { filter, loading } = useSelector(selectFilterReducer);

  const {
    priceMin,
    priceMax,
    mileageMin,
    mileageMax,
    yearMin,
    yearMax,
    ownersCountMin,
    ownersCountMax,
    mark,
    model,
    settlement,
    isShowroom,
  } = filter ?? {};

  let disabled = true;

  if (
    priceMin ||
    priceMax ||
    mileageMin ||
    mileageMax ||
    yearMin ||
    yearMax ||
    ownersCountMin ||
    ownersCountMax ||
    mark ||
    model ||
    settlement ||
    isShowroom
  ) {
    disabled = false;
  }

  let counter = null;

  if (label === 'Поиск') counter = disabled ? null : totalItems;
  if (label === 'Избранное') counter = favoriteCars?.length;
  if (label === 'Сравнение') counter = comparedCars?.length;

  return (
    <div
      className={cn(
        classes.root__buttonsBlock__option,
        isActive && classes.root__buttonsBlock__option__active,
      )}
      onClick={handleClick}
    >
      <div className={classes.root__buttonsBlock__option__iconTitle}>
        <Icon />
        {label}
      </div>
      <div className={classes.root__buttonsBlock__option__counter}>
        <Tooltip title="Количество объявлений" placement="bottom">
          {isActive && !loading && counter !== null ? counter : null}
        </Tooltip>
      </div>
    </div>
  );
};

const LeftSidebar: FC<LeftSidebarProps> = ({ pathname }) => {
  const activeItem = useMemo(() => navigationItems.find((item) => item.path === pathname), [pathname]);

  return (
    <div className={classes.root}>
      <div className={classes.root__buttonsBlock}>
        {navigationItems.map((item) => (
          <NavigationItem
            key={item.path}
            {...item}
            isActive={item.path === activeItem?.path}
            disabled={false}
          />
        ))}
      </div>
      <div className={classes.root__infoBlock}>
        Агрегатор объявлений
        <br />
        <div style={{ textAlign: 'end', fontFamily: 'Courier New, Courier, monospace' }}>
          о продаже автомобилей
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
