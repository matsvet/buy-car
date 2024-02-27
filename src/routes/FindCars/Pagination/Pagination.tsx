import { AppDispatch } from '@store';
import { Button, Spin } from 'antd';
import { fetchCars } from '@state/cars/thunks';
import { selectCarsReducer } from '@state/cars/selectors';
import { selectUser } from '@state/user/selectors';
import { useDispatch, useSelector } from 'react-redux';
import React, { FC, useEffect } from 'react';
import classes from './Pagination.module.scss';

export const Pagination: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector(selectUser);
  const { currentPage, pageSize, totalItems, loading } = useSelector(selectCarsReducer);

  const getNextPage = () => {
    void dispatch(
      fetchCars({
        userId: user?.uid ?? null,
        page: currentPage + 1,
        pageSize,
      }),
    );
  };

  useEffect(() => {
    void dispatch(fetchCars({ userId: user?.uid ?? null, page: 1, pageSize }));
  }, [user?.uid]);

  return (
    <div className={classes.root}>
      {!loading ? (
        <Button
          onClick={getNextPage}
          disabled={totalItems ? pageSize * currentPage > totalItems : true}
          size="large"
        >
          Показать еще
        </Button>
      ) : (
        <Spin />
      )}
    </div>
  );
};

export default Pagination;
