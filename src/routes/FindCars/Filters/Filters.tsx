import { AppDispatch } from '@store';
import { Select } from 'antd';
import { useDispatch } from 'react-redux';
import React, { FC } from 'react';
import classes from './Filters.module.scss';

export const Filters: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <Select>
        <Select.Option value="sample">Sample</Select.Option>
      </Select>
    </div>
  );
};

export default Filters;
