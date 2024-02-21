import { AppDispatch } from '@store';
import { Button, Table } from 'antd';
import { TableRowSelection } from 'antd/es/table/interface';
import { columns, locale } from './helpers';
import { fetchCars } from '@state/cars/thunks';
import { selectCarsReducer } from '@state/cars/selectors';
import { useDispatch, useSelector } from 'react-redux';
import Filters from './Filters';
import React, { FC, useEffect, useState } from 'react';
import classes from './FindCars.module.scss';

export const FindCars: FC = () => {
  const [selectedEntitiesKeys, setSelectedEntitiesKeys] = useState<React.Key[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  const { cars, loading, error } = useSelector(selectCarsReducer);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedEntitiesKeys(newSelectedRowKeys);
  };
  const rowSelection: TableRowSelection<Record<string, string>> = {
    selectedRowKeys: selectedEntitiesKeys,
    onChange: onSelectChange,
  };

  return (
    <div>
      <div>Поиск авто</div>
      <Filters />
      <Button onClick={fetchCars}>Применить</Button>
      <div className={classes.tableContainer}>
        {error && <div>{error}</div>}
        <Table
          columns={columns}
          dataSource={cars ?? undefined}
          rowSelection={rowSelection}
          locale={locale}
          loading={loading}
          // scroll={{ y: 400 }}
        />
      </div>
    </div>
  );
};

export default FindCars;
