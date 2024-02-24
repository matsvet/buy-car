import { AppDispatch } from '@store';
import { Table } from 'antd';
import { clickOnCompare, clickOnFavorite, fetchCompared } from '@state/cars/thunks';
import { columns, locale } from '../FindCars/helpers';
import { selectCarsReducer } from '@state/cars/selectors';
import { selectUser } from '@state/user/selectors';
import { useDispatch, useSelector } from 'react-redux';
import ErrorComponent from '../../Components/ErrorComponent';
import React, { FC, useEffect } from 'react';
import classes from './ComparedCars.module.scss';

export const ComparedCars: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector(selectUser);
  const { comparedCars, loadingCompared, error } = useSelector(selectCarsReducer);

  const handleChangeFavorite = (carId: string) => {
    dispatch(clickOnFavorite({ carId, userId: user?.uid }));
  };

  const handleChangeCompared = (carId: string) => {
    dispatch(clickOnCompare({ carId, userId: user?.uid }));
  };

  useEffect(() => {
    if (user?.uid) dispatch(fetchCompared(user?.uid));
  }, [dispatch, user?.uid]);

  return (
    <div className={classes.root}>
      <div className={classes.root__tableContainer}>
        <ErrorComponent errorMessage={error} />
        <Table
          columns={columns(handleChangeFavorite, handleChangeCompared)}
          dataSource={comparedCars ?? undefined}
          locale={locale}
          loading={loadingCompared}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default ComparedCars;
