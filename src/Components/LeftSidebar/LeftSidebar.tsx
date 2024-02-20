import { Button } from 'antd';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './LeftSidebar.module.scss';

const LeftSidebar: FC = () => {
  const navigate = useNavigate();

  const goToFindCars = () => {
    navigate('/find-cars');
  };

  return (
    <div className={classes.root}>
      LeftSidebar
      <Button onClick={goToFindCars}>Поиск</Button>
    </div>
  );
};

export default LeftSidebar;
