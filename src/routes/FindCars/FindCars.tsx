import { AppDispatch } from '@store';
import { Button, Form, Input, Table } from 'antd';
import { selectUser } from '@state/user/selectors';
import { signInWithGoogle, signOut } from '@state/user/thunks';
import { useDispatch, useSelector } from 'react-redux';
import React, { FC } from 'react';
import { ColumnsType } from 'antd/es/table';
import Filters from './Filters';

const columns: ColumnsType = [
  {
    title: 'Name',
  },
];

export const FindCars: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <div>Поиск авто</div>
      <Filters />
      <Table />
    </div>
  );
};

export default FindCars;
