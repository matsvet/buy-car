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

  return (
    <div className={classes.root}>
      <div className={classes.root__buttonsBlock}>
        <Button onClick={goToFindCars}>Поиск</Button>
        <Button onClick={goToFavoriteCars}>Избранное</Button>
        <Button onClick={goToComparedCars}>Сравнение</Button>
      </div>
    </div>
  );
};

export default LeftSidebar;
