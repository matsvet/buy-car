import { AppDispatch } from '@store';
import { FilterOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Segmented, Table } from 'antd';
import { clickOnCompare, clickOnFavorite, fetchFavorites } from '@state/cars/thunks';
import { columns, locale } from '../FindCars/helpers';
import { favColumns } from './helpers';
import { selectCarsReducer } from '@state/cars/selectors';
import { selectUser } from '@state/user/selectors';
import { useDispatch, useSelector } from 'react-redux';
import ErrorComponent from '../../Components/ErrorComponent';
import React, { FC, useEffect } from 'react';
import classes from './FavoriteCars.module.scss';

export const FavoriteCars: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector(selectUser);
  const { favoriteCars, loadingFavorites, error } = useSelector(selectCarsReducer);

  const handleChangeFavorite = (carId: string) => {
    void dispatch(clickOnFavorite({ carId, userId: user?.uid }));
  };

  const handleChangeCompared = (carId: string) => {
    void dispatch(clickOnCompare({ carId, userId: user?.uid }));
  };

  useEffect(() => {
    if (user?.uid) void dispatch(fetchFavorites(user?.uid));
  }, [dispatch, user?.uid]);

  return (
    <div className={classes.root}>
      <div className={classes.root__tableContainer}>
        <Segmented
          options={[
            {
              label: 'Объявления',
              value: 'Объявления',
              icon: <UnorderedListOutlined />,
              className: classes.tab,
            },
            { label: 'Фильтры', value: 'Фильтры', icon: <FilterOutlined />, className: classes.tab },
          ]}
          // width={1000}
          style={{ width: '100%', margin: '0 0 20px 0' }}
        />
        <ErrorComponent errorMessage={error} />
        <Table
          columns={favColumns(handleChangeFavorite, handleChangeCompared)}
          dataSource={favoriteCars ?? undefined}
          locale={locale}
          loading={loadingFavorites}
          rowClassName={(record) =>
            record.settlement === 'Старый Крым' || record.price === 975000 ? classes.disabledRow : undefined
          }
          // pagination
        />
      </div>
    </div>
  );
};

export default FavoriteCars;
