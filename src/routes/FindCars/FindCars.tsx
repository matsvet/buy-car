import { AppDispatch } from '@store';
import { Collapse, Table } from 'antd';
import { TableRowSelection } from 'antd/es/table/interface';
import { collapseItems, columns, locale } from './helpers';
import { fetchCars } from '@state/cars/thunks';
import { selectCarsReducer } from '@state/cars/selectors';
import { useDispatch, useSelector } from 'react-redux';
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
        {error && <div>{error}</div>}
        <Table
          columns={columns}
          dataSource={cars ?? undefined}
          // rowSelection={rowSelection}
          locale={locale}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default FindCars;
