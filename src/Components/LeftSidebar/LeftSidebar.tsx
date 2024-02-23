import { AlignLeftOutlined, SearchOutlined, StarOutlined, SwapOutlined } from '@ant-design/icons';
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
        <div className={classes.root__buttonsBlock__option} onClick={goToFindCars}>
          <SearchOutlined />
          Поиск
        </div>
        <div className={classes.root__buttonsBlock__option} onClick={goToFavoriteCars}>
          <StarOutlined />
          Избранное
        </div>
        <div className={classes.root__buttonsBlock__option} onClick={goToComparedCars}>
          <SwapOutlined />
          Сравнение
        </div>
        <div className={classes.root__buttonsBlock__option} onClick={goToNews}>
          <AlignLeftOutlined />
          Новости
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
