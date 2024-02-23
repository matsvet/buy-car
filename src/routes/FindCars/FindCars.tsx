import { AppDispatch } from '@store';
import { Collapse, Table } from 'antd';
import { collapseItems, columns, locale } from './helpers';
import { clickOnCompare, clickOnFavorite, fetchCars } from '@state/cars/thunks';
import { selectCarsReducer } from '@state/cars/selectors';
import { selectUser } from '@state/user/selectors';
import { useDispatch, useSelector } from 'react-redux';
import ErrorComponent from '../../Components/ErrorComponent';
import React, { FC, useEffect } from 'react';
import classes from './FindCars.module.scss';

export const FindCars: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector(selectUser);
  const { cars, favoriteCars, comparedCars, loading, error } = useSelector(selectCarsReducer);

  const handleChangeFavorite = (carId: string) => {
    dispatch(clickOnFavorite({ carId, userId: user?.uid }));
  };

  const handleChangeCompared = (carId: string) => {
    dispatch(clickOnCompare({ carId, userId: user?.uid }));
  };

  useEffect(() => {
    dispatch(fetchCars(user?.uid));
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <div className={classes.root__filtersContainer}>
        <Collapse
          items={collapseItems}
          defaultActiveKey={['carsFilter']} // todo потом выключить, для демонстрации открывать и закрывать
          bordered={false}
          expandIconPosition="end"
          className={classes.filtersCollapse}
        />
      </div>
      <div className={classes.root__tableContainer}>
        <ErrorComponent errorMessage={error} />
        <Table
          columns={columns(handleChangeFavorite, handleChangeCompared)}
          dataSource={cars ?? undefined}
          locale={locale}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default FindCars;
