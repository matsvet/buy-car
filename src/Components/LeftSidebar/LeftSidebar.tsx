import { Button } from 'antd';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './LeftSidebar.module.scss';

const LeftSidebar: FC = () => {
  const navigate = useNavigate();

  const goToFindCars = () => {
    navigate('/find-cars');
  };
  const goToFavoriteCars = () => {
    navigate('/favorite-cars');
  };
  const goToComparedCars = () => {
    navigate('/compared-cars');
  };
  const goToNews = () => {
    navigate('/news');
  };

  return (
    <div className={classes.root}>
      <div className={classes.root__buttonsBlock}>
        <Button onClick={goToFindCars} size="large">
          Поиск
        </Button>
        <Button onClick={goToFavoriteCars} size="large">
          Избранное
        </Button>
        <Button onClick={goToComparedCars} size="large">
          Сравнение
        </Button>
        <Button onClick={goToNews} size="large">
          Новости
        </Button>
      </div>
    </div>
  );
};

export default LeftSidebar;
