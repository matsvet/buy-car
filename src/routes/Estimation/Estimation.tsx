import { AppDispatch } from '@store';
import { Button, Form, InputNumber, Select, Spin, Tooltip } from 'antd';
import { FunctionComponent, useEffect, useState } from 'react';
import { IFilter } from '@state/filter/types';
import { fetchCities, fetchFilter, fetchMarks, fetchModels } from '@state/filter/thunks';
import { selectFilterReducer } from '@state/filter/selectors';
import { selectUser } from '@state/user/selectors';
import { useDispatch, useSelector } from 'react-redux';
import classes from './Estimation.module.scss';

interface NotificationsProps {
  prop?: null;
}

const Notifications: FunctionComponent<NotificationsProps> = () => {
  const [showResult, setShowResult] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [localLoading, setLocalLoading] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const [form] = Form.useForm<Omit<IFilter, 'userId' | 'sorting'>>();

  const user = useSelector(selectUser);
  const { filter, marks, models, cities, loading, loadingModels, error } = useSelector(selectFilterReducer);

  const handleSelectMark = (value: string) => {
    form.setFieldValue('model', undefined);
    void dispatch(fetchModels(value));
  };

  const handleSubmit = (): void => {
    setLocalLoading(true);
    setTimeout(
      () => {
        setLocalLoading(false);
        setShowResult(!showResult);
      },
      showResult ? 0 : 2000,
    );
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

  const formContent = (
    <>
      {' '}
      <div className={classes.root__title}>Заполните параметры, чтобы получить оценку</div>
      <div className={classes.root__mainContent}>
        <Form form={form} layout="inline">
          <div className={classes.filtersForm}>
            <div>
              Город продажи
              <div className={classes.pairedContainer}>
                <Tooltip title="Город">
                  <Form.Item name="settlement" initialValue={undefined}>
                    <Select placeholder="Город" showSearch style={{ width: '315px' }}>
                      <Select.Option key={'Москва'}>Москва</Select.Option>
                      <Select.Option key={'Санкт-Петербург'}>Санкт-Петербург</Select.Option>
                      {cities?.map((opt) => (
                        <Select.Option key={opt}>{opt}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Tooltip>
              </div>
            </div>
            <div>
              Марка и модель
              <div className={classes.pairedContainer}>
                <Tooltip title="Марка">
                  <Form.Item name="mark" initialValue={undefined}>
                    <Select
                      placeholder="Марка"
                      onSelect={handleSelectMark}
                      showSearch
                      style={{ width: '150px' }}
                    >
                      {marks?.map((opt) => (
                        <Select.Option key={opt}>{opt}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Tooltip>
                <Tooltip title="Модель">
                  <Form.Item name="model" initialValue={undefined}>
                    <Select
                      placeholder="Модель"
                      disabled={!models || models.length === 0 || loadingModels}
                      showSearch
                      style={{ width: '150px' }}
                    >
                      {models?.map((opt) => (
                        <Select.Option key={opt}>{opt}</Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Tooltip>
              </div>
            </div>
            <div>
              Год выпуска
              <div className={classes.pairedContainer}>
                <Tooltip title="Год">
                  <Form.Item name="yearMin" initialValue={undefined}>
                    <InputNumber
                      className={classes.pairedItem}
                      min={1900}
                      max={2024}
                      placeholder="Год"
                      style={{ width: '315px' }}
                    />
                  </Form.Item>
                </Tooltip>
              </div>
            </div>
            <div>
              Коробка передач
              <div className={classes.pairedContainer}>
                <Tooltip title="Коробка передач">
                  <Form.Item name="yearMax" initialValue={undefined}>
                    <Select placeholder="КПП" style={{ width: '315px' }}>
                      <Select.Option key="auto">Автомат</Select.Option>
                      <Select.Option key="manual">Механика</Select.Option>
                      <Select.Option key="robot">Робот</Select.Option>
                      <Select.Option key="variator">Вариатор</Select.Option>
                    </Select>
                  </Form.Item>
                </Tooltip>
              </div>
            </div>
            <div>
              Тип кузова
              <div className={classes.pairedContainer}>
                <Tooltip title="Кузов">
                  <Form.Item name="mileageMax" initialValue={undefined}>
                    <Select placeholder="Кузов" style={{ width: '315px' }}>
                      <Select.Option key="седан">Седан</Select.Option>
                      <Select.Option key="хэтчбек">Хэтчбек</Select.Option>
                      <Select.Option key="лифтбек">Лифтбек</Select.Option>
                      <Select.Option key="универсал">Универсал</Select.Option>
                      <Select.Option key="Кроссовер">Кроссовер</Select.Option>
                      <Select.Option key="Кабриолет">Кабриолет</Select.Option>
                      <Select.Option key="Минивэн">Минивэн</Select.Option>
                      <Select.Option key="Купе">Купе</Select.Option>
                      <Select.Option key="Пикап">Пикап</Select.Option>
                      <Select.Option key="Лимузин">Лимузин</Select.Option>
                    </Select>
                  </Form.Item>
                </Tooltip>
              </div>
            </div>
            <div>
              Количество владельцев по ПТС
              <div className={classes.pairedContainer}>
                <Tooltip title="Владельцев">
                  <Form.Item name="ownersCountMin" initialValue={undefined}>
                    <InputNumber
                      className={classes.pairedItem}
                      min={0}
                      max={10}
                      placeholder="Владельцев"
                      style={{ width: '315px' }}
                    />
                  </Form.Item>
                </Tooltip>
              </div>
            </div>
            <div>
              Количество л.с.
              <div className={classes.pairedContainer}>
                <Tooltip title="Л.С.">
                  <Form.Item name="ownersCountMax" initialValue={undefined}>
                    <InputNumber
                      className={classes.pairedItem}
                      min={0}
                      max={3000}
                      placeholder="Л.С."
                      style={{ width: '315px' }}
                    />
                  </Form.Item>
                </Tooltip>
              </div>
            </div>
            <div>
              Пробег
              <div className={classes.pairedContainer}>
                <Tooltip title="Пробег">
                  <Form.Item name="mileageMin" initialValue={undefined}>
                    <InputNumber
                      className={classes.pairedItem}
                      min={0}
                      max={100000000}
                      placeholder="Пробег"
                      style={{ width: '315px' }}
                      onChange={() => setDisabledButton(false)}
                    />
                  </Form.Item>
                </Tooltip>
              </div>
            </div>
          </div>
        </Form>

        <div className={classes.root__sortAndButtons}>
          <div className={classes.root__buttonsBlock}>
            <div className={classes.btn}>
              <Button
                onClick={handleSubmit}
                type="primary"
                size="large"
                style={{ width: '100%', marginTop: '20px', backgroundColor: 'grey' }}
                disabled={disabledButton}
              >
                Оценить
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const resultContent = (
    <div className={classes.root__resultContent}>
      Ваш автомобиль: <b>Chevrolet Cobalt 2013</b>
      <br />
      Примерная стоимость: <b>690 000 руб</b>
      <div className={classes.btn}>
        <Button
          onClick={handleSubmit}
          type="primary"
          size="large"
          style={{ width: '100%', marginTop: '30px', backgroundColor: 'grey' }}
        >
          Оценить другой автомобиль
        </Button>
      </div>
    </div>
  );

  if (localLoading) {
    return (
      <div className={classes.root__loader}>
        <Spin size="large" />
      </div>
    );
  }

  return <div className={classes.root}>{!showResult ? formContent : resultContent}</div>;
};

export default Notifications;
