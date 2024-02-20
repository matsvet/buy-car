import { AppDispatch } from '@store';
import { Button, Table } from 'antd';
import { Car } from '@api/searchedCars';
import { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import { backURL } from '../../constants';
import { useDispatch } from 'react-redux';
import Filters from './Filters';
import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import classes from './FindCars.module.scss';

// todo странная типизация
const columns: ColumnsType<any> = [
  {
    title: 'Марка',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Где',
    dataIndex: 'settlement',
    key: 'settlement',
  },
  {
    title: 'Цена',
    dataIndex: 'price',
    key: 'price',
  },
];

export const FindCars: FC = () => {
  const [selectedEntitiesKeys, setSelectedEntitiesKeys] = useState<React.Key[]>([]);
  const [items, setItems] = useState<Car[]>([]);

  // const dispatch = useDispatch<AppDispatch>();

  // Функция для загрузки всех элементов
  const fetchCars = async () => {
    try {
      const response = await axios.get(`${backURL}/cars`);
      setItems(response.data);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedEntitiesKeys(newSelectedRowKeys);
  };
  const rowSelection: TableRowSelection<Record<string, string>> = {
    selectedRowKeys: selectedEntitiesKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div>
      <div>Поиск авто</div>
      <Filters />
      <Button onClick={fetchCars}>Применить</Button>
      <div className={classes.tableContainer}>
        <Table
          columns={columns}
          dataSource={items}
          // scroll={{ y: 400 }}
          rowSelection={rowSelection}
        />
      </div>
    </div>
  );
};

export default FindCars;
