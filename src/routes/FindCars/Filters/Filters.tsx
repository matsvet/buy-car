import { AppDispatch } from '@store';
import { Button, Form, InputNumber, Select, Spin, Tooltip, message } from 'antd';
import { IFilter } from '@state/filter/types';
import { fetchCars } from '@state/cars/thunks';
import { fetchCities, fetchFilter, fetchMarks, fetchModels, updateFilter } from '@state/filter/thunks';
import { selectCarsReducer } from '@state/cars/selectors';
import { selectFilterReducer } from '@state/filter/selectors';
import { selectUser } from '@state/user/selectors';
import { useDispatch, useSelector } from 'react-redux';
import ErrorComponent from '../../../Components/ErrorComponent';
import React, { FC, useEffect, useState } from 'react';
import classes from './Filters.module.scss';
import { SaveOutlined } from '@ant-design/icons';

type ResetFields = keyof Omit<IFilter, 'userId' | 'sorting'>;

export const Filters: FC = () => {
  const [sorting, setSorting] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector(selectUser);
  const { pageSize } = useSelector(selectCarsReducer);
  const { filter, marks, models, cities, loading, loadingModels, error } = useSelector(selectFilterReducer);

  const [form] = Form.useForm<Omit<IFilter, 'userId' | 'sorting'>>();

  const handleSubmit = (): void => {
    if (!user?.uid) {
      void message.error('Авторизуйтесь, чтобы использовать фильтры');
      return;
    }

    const formValues = form.getFieldsValue();
    const currentFilter: IFilter = {
      ...formValues,
      userId: user.uid,
      sorting,
    };

    void dispatch(updateFilter(currentFilter));
  };

  const handleResetFilters = (): void => {
    if (!user?.uid) {
      void message.error('Авторизуйтесь, чтобы использовать фильтры');
      return;
    }

    const resetFields: ResetFields[] = [
      'priceMin',
      'priceMax',
      'mileageMin',
      'mileageMax',
      'yearMin',
      'yearMax',
      'ownersCountMin',
      'ownersCountMax',
      'mark',
      'model',
      'settlement',
      'isShowroom',
    ];

    const currentFilter: IFilter = resetFields.reduce(
      (acc, field) => ({
        ...acc,
        [field]: null,
      }),
      { userId: user.uid, sorting: null },
    );

    void dispatch(updateFilter(currentFilter));
    void dispatch(fetchFilter(user.uid));

    form.setFields(resetFields.map((name) => ({ name, value: undefined })));
    setSorting(null);
  };

  const handleSelectMark = (value: string) => {
    form.setFieldValue('model', undefined);
    void dispatch(fetchModels(value));
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user?.uid) {
        await dispatch(fetchFilter(user.uid));
      }
      await dispatch(fetchMarks());
      await dispatch(fetchCities());
    };
    void fetchData();
  }, [dispatch, user?.uid]);

  useEffect(() => {
    form.getFieldValue('mark') && dispatch(fetchModels(form.getFieldValue('mark') as string));
  }, [dispatch, form.getFieldValue('mark')]);

  useEffect(() => {
    if (user?.uid) void dispatch(fetchCars({ userId: user?.uid, page: 1, pageSize }));
  }, [dispatch, filter]);

  return (
    <div className={classes.root}>
      {loading ? (
        <div className={classes.root__loader}>
          <Spin size="large" />
        </div>
      ) : (
        <div className={classes.root__mainContent}>
          <ErrorComponent errorMessage={error} />
          <Form form={form} layout="inline">
            <div className={classes.filtersForm}>
              <div className={classes.pairedContainer}>
                <Tooltip title="Марка">
                  <Form.Item name="mark" initialValue={filter?.mark ?? undefined}>
                    <Select placeholder="Марка" onSelect={handleSelectMark} showSearch>
                      <Select.Option key="all">Все</Select.Option>
                      {marks?.map((opt) => (
                        <Select.Option key={opt}>{opt}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Tooltip>
                <Tooltip title="Модель">
                  <Form.Item name="model" initialValue={filter?.model ?? undefined}>
                    <Select
                      placeholder="Модель"
                      disabled={!models || models.length === 0 || loadingModels}
                      showSearch
                    >
                      <Select.Option key="all">Все</Select.Option>
                      {models?.map((opt) => (
                        <Select.Option key={opt}>{opt}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Tooltip>
              </div>
              <div className={classes.pairedContainer}>
                <Tooltip title="Цена, от">
                  <Form.Item name="priceMin" initialValue={filter?.priceMin ?? undefined}>
                    <InputNumber
                      className={classes.pairedItem}
                      min={0}
                      max={1000000000}
                      placeholder="Цена, от"
                    />
                  </Form.Item>
                </Tooltip>
                <Tooltip title="Цена, до">
                  <Form.Item name="priceMax" initialValue={filter?.priceMax ?? undefined}>
                    <InputNumber
                      className={classes.pairedItem}
                      min={1}
                      max={1000000000}
                      placeholder="Цена, до"
                    />
                  </Form.Item>
                </Tooltip>
              </div>
              <div className={classes.pairedContainer}>
                <Tooltip title="Пробег, от">
                  <Form.Item name="mileageMin" initialValue={filter?.mileageMin ?? undefined}>
                    <InputNumber
                      className={classes.pairedItem}
                      min={0}
                      max={100000000}
                      placeholder="Пробег, от"
                    />
                  </Form.Item>
                </Tooltip>
                <Tooltip title="Пробег, до">
                  <Form.Item name="mileageMax" initialValue={filter?.mileageMax ?? undefined}>
                    <InputNumber
                      className={classes.pairedItem}
                      min={1}
                      max={100000000}
                      placeholder="Пробег, до"
                    />
                  </Form.Item>
                </Tooltip>
              </div>
              <div className={classes.pairedContainer}>
                <Tooltip title="Год, от">
                  <Form.Item name="yearMin" initialValue={filter?.yearMin ?? undefined}>
                    <InputNumber className={classes.pairedItem} min={1900} max={2024} placeholder="Год, от" />
                  </Form.Item>
                </Tooltip>
                <Tooltip title="Год, до">
                  <Form.Item name="yearMax" initialValue={filter?.yearMax ?? undefined}>
                    <InputNumber className={classes.pairedItem} min={1901} max={2024} placeholder="Год, до" />
                  </Form.Item>
                </Tooltip>
              </div>
              <div className={classes.pairedContainer}>
                <Tooltip title="Владельцев, от">
                  <Form.Item name="ownersCountMin" initialValue={filter?.ownersCountMin ?? undefined}>
                    <InputNumber
                      className={classes.pairedItem}
                      min={0}
                      max={10}
                      placeholder="Владельцев, от"
                    />
                  </Form.Item>
                </Tooltip>
                <Tooltip title="Владельцев, до">
                  <Form.Item name="ownersCountMax" initialValue={filter?.ownersCountMax ?? undefined}>
                    <InputNumber
                      className={classes.pairedItem}
                      min={1}
                      max={10}
                      placeholder="Владельцев, до"
                    />
                  </Form.Item>
                </Tooltip>
              </div>
              <div className={classes.pairedContainer}>
                <Tooltip title="Город">
                  <Form.Item name="settlement" initialValue={filter?.settlement ?? undefined}>
                    <Select placeholder="Город" showSearch>
                      <Select.Option key={'all'}>Все</Select.Option>
                      <Select.Option key={'Москва'}>Москва</Select.Option>
                      <Select.Option key={'Санкт-Петербург'}>Санкт-Петербург</Select.Option>
                      {cities?.map((opt) => (
                        <Select.Option key={opt}>{opt}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Tooltip>
                <Tooltip title="Владелец">
                  <Form.Item name="isShowroom" initialValue={filter?.isShowroom ?? undefined}>
                    <Select placeholder="Владелец">
                      <Select.Option key="all">Все</Select.Option>
                      <Select.Option key="person">Частник</Select.Option>
                      <Select.Option key="showroom">Компания</Select.Option>
                    </Select>
                  </Form.Item>
                </Tooltip>
              </div>
            </div>
          </Form>

          <div className={classes.root__sortAndButtons}>
            <div className={classes.root__sortBlock}>
              <Tooltip title="Сортировать по">
                <Select
                  placeholder="Сортировать по"
                  className={classes.root__sortBlock__select}
                  onChange={(e) => {
                    if (e === 'default') setSorting(null);
                    else setSorting(e);
                  }}
                  defaultValue={filter?.sorting}
                >
                  <Select.Option key="default" onClick={() => setSorting(null)}>
                    По умолчанию
                  </Select.Option>
                  <Select.Option key="priceFromLow">Возрастанию цены</Select.Option>
                  <Select.Option key="priceFromHigh">Убыванию цены</Select.Option>
                  <Select.Option key="dateFromNew">Сначала новые</Select.Option>
                  <Select.Option key="dateFromOld">Сначала старые</Select.Option>
                  <Select.Option key="mileageFromLow">Возраст. пробега</Select.Option>
                  <Select.Option key="mileageFromHigh">Убыванию пробега</Select.Option>
                </Select>
              </Tooltip>
              <Tooltip title="Показывать по">
                <Select
                  placeholder="Кол-во"
                  defaultValue={10}
                  className={classes.root__sortBlock__selectShowBy}
                  // onChange={(e) => {
                  //   if (e === 'default') setSorting(null);
                  //   else setSorting(e);
                  // }}
                  // defaultValue={filter?.sorting}
                >
                  <Select.Option
                    key="default"
                    // onClick={() => setSorting(null)}
                  >
                    10
                  </Select.Option>
                  <Select.Option key="priceFromLow">30</Select.Option>
                  <Select.Option key="priceFromHigh">50</Select.Option>
                </Select>
              </Tooltip>
            </div>
            <div className={classes.root__sortBlock}></div>
            <div className={classes.root__buttonsBlock}>
              <div className={classes.btn}>
                <Button onClick={handleResetFilters} danger>
                  Сбросить фильтры
                </Button>
              </div>
              <div className={classes.btn}>
                <Button onClick={handleSubmit}>Применить фильтры</Button>
              </div>
              <div className={classes.btn}>
                <Tooltip title="Сохранить фильтры">
                  <Button onClick={handleSubmit}>
                    <SaveOutlined />
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
