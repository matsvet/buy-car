import { AppDispatch } from '@store';
import { Button, Form, Input, Table } from 'antd';
import { Car } from '@api/searchedCars';
import { ColumnsType } from 'antd/es/table';
import { backURL } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import Filters from './Filters';
import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import classes from './FindCars.module.scss';

const columns: ColumnsType = [
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
  const dispatch = useDispatch<AppDispatch>();
  const [items, setItems] = useState<Car[]>([]);

  // Функция для загрузки всех элементов
  const fetchCars = async () => {
    try {
      const response = await axios.get(`${backURL}/cars`);
      setItems(response.data);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div>
      <div>Поиск авто</div>
      <Filters />
      <Button onClick={fetchCars}>Показать авто</Button>
      <div className={classes.tableContainer}>
        <Table columns={columns} dataSource={items} scroll={{ y: 400 }} />
      </div>
    </div>
  );
};

export default FindCars;
