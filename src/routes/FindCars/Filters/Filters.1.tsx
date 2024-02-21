import { AppDispatch } from '@store';
import { Button, Form, InputNumber, Select } from 'antd';
import { fetchFilter } from '@state/filter/thunks';
import { selectFilterReducer } from '@state/filter/selectors';
import { useDispatch, useSelector } from 'react-redux';
import React, { FC, useEffect } from 'react';

export const Filters: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [form] = Form.useForm();

  const handleSubmit = () => {
    // Вызываем функцию onFilterChange с текущими значениями формы для фильтрации данных
    // onFilterChange(form.getFieldsValue());
  };

  const { filter, loading, error } = useSelector(selectFilterReducer);

  useEffect(() => {
    dispatch(fetchFilter());
  }, [dispatch]);

  return (
    <div>
      <Form form={form} layout="inline" onFinish={handleSubmit}>
        <Form.Item name="selectValue" label="Селект">
          <Select placeholder="Выберите значение" allowClear>
            <Select.Option value="option1">Опция 1</Select.Option>
            <Select.Option value="option2">Опция 2</Select.Option>
            <Select.Option value="option3">Опция 3</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="dateRange" label="Диапазон дат">
          <RangePicker />
        </Form.Item>

        <Form.Item name="numberValue" label="Число">
          <InputNumber min={1} max={10} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Фильтровать
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
