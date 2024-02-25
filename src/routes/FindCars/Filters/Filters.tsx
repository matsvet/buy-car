import { AppDispatch } from '@store';
import { Button, Form, InputNumber, Select, Spin, Tooltip, message } from 'antd';
import { IFilter } from '@state/filter/types';
import { fetchCars } from '@state/cars/thunks';
import { fetchCities, fetchFilter, fetchMarks, fetchModels, updateFilter } from '@state/filter/thunks';
import { selectFilterReducer } from '@state/filter/selectors';
import { selectUser } from '@state/user/selectors';
import { useDispatch, useSelector } from 'react-redux';
import ErrorComponent from '../../../Components/ErrorComponent';
import React, { FC, useEffect, useState } from 'react';
import classes from './Filters.module.scss';

export const Filters: FC = () => {
  const [sorting, setSorting] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector(selectUser);
  const { filter, marks, models, cities, loading, loadingModels, error } = useSelector(selectFilterReducer);

  const [form] = Form.useForm();

  const handleSubmit = async () => {
    if (!user?.uid) {
      message.error('Не найден ID текущего пользователя');
      return;
    }

    const formValues: IFilter = form.getFieldsValue() as IFilter;
    const currentFilter: IFilter = {
      userId: user.uid,
      priceMin: formValues.priceMin,
      priceMax: formValues.priceMax ?? null,
      mileageMin: formValues.mileageMin,
      mileageMax: formValues.mileageMax,
      yearMin: formValues.yearMin,
      yearMax: formValues.yearMax,
      ownersCountMin: formValues.ownersCountMin,
      ownersCountMax: formValues.ownersCountMax,
      mark: formValues.mark,
      model: formValues.model,
      settlement: formValues.settlement !== 'all' ? formValues.settlement : undefined,
      isShowroom: formValues.isShowroom,
      sorting,
    };

    // TODO разобраться, нужен ли await идеологически
    await dispatch(updateFilter(currentFilter));
  };

  const handleResetFilters = () => {
    if (!user?.uid) {
      message.error('Не найден ID текущего пользователя');
      return;
    }

    const currentFilter: IFilter = {
      userId: user.uid,
      priceMin: null,
      priceMax: null,
      mileageMin: null,
      mileageMax: null,
      yearMin: null,
      yearMax: null,
      ownersCountMin: null,
      ownersCountMax: null,
      mark: null,
      model: null,
      settlement: null,
      isShowroom: null,
      sorting: null,
    };

    dispatch(updateFilter(currentFilter));

    dispatch(fetchFilter(user?.uid));

    form.setFields([
      { name: 'userId', value: user.uid },
      { name: 'priceMin', value: undefined },
      { name: 'priceMax', value: undefined },
      { name: 'mileageMin', value: undefined },
      { name: 'mileageMax', value: undefined },
      { name: 'yearMin', value: undefined },
      { name: 'yearMax', value: undefined },
      { name: 'ownersCountMin', value: undefined },
      { name: 'ownersCountMax', value: undefined },
      { name: 'mark', value: undefined },
      { name: 'model', value: undefined },
      { name: 'settlement', value: undefined },
      { name: 'isShowroom', value: undefined },
    ]);
    setSorting(null);
  };

  const handleSelectMark = async (value: string) => {
    form.setFieldValue('model', undefined);
    await dispatch(fetchModels(value));
  };

  useEffect(() => {
    const fetchData = async () => {
      // Поскольку каждый dispatch возвращает Promise (предполагая, что они асинхронны),
      // вы можете использовать await для ожидания их завершения.
      if (user?.uid) {
        await dispatch(fetchFilter(user.uid));
      }
      await dispatch(fetchMarks());
      await dispatch(fetchCities());
    };

    fetchData();
  }, [dispatch, user?.uid]);

  useEffect(() => {
    form.getFieldValue('mark') && dispatch(fetchModels(form.getFieldValue('mark') as string));
  }, [dispatch, form.getFieldValue('mark')]);

  useEffect(() => {
    if (user?.uid) dispatch(fetchCars(user?.uid));
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
                  <Select.Option key="mileageFromLow">Возрастанию пробега</Select.Option>
                  <Select.Option key="mileageFromHigh">Убыванию пробега</Select.Option>
                </Select>
              </Tooltip>
            </div>
            <div className={classes.root__buttonsBlock}>
              <div className={classes.btn}>
                <Button onClick={handleResetFilters} danger>
                  Сбросить фильтры
                </Button>
              </div>
              <div className={classes.btn}>
                <Button onClick={handleSubmit}>Применить фильтры</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
