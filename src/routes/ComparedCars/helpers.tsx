import {
  CheckCircleFilled,
  CheckCircleOutlined,
  InfoCircleOutlined,
  StarFilled,
  StarOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { ICar } from '@state/cars/types';
import { ImageLoader } from '../FindCars/helpers';
import { TableLocale } from 'antd/es/table/interface';
import { Tooltip } from 'antd';
import { format } from 'date-fns';
import classes from '../FindCars/FindCars.module.scss';

export const comparedColumns = (
  handleChangeFavorite: (carId: string) => void,
  handleChangeCompared: (carId: string) => void,
): ColumnsType<ICar> => [
  {
    title: 'Дата',
    dataIndex: 'date',
    key: 'date',
    // render: (text, record) => <div>{format(new Date(record.publishDate), 'yyyy-MM-dd HH:mm:ss')}</div>,
    render: (text, record) => (
      <div>
        <div style={{ fontWeight: '500' }}>{format(new Date(record.publishDate), 'HH:mm:ss')}</div>
        <div style={{ color: '#767289' }}>{format(new Date(record.publishDate), 'dd/MM/yyyy')}</div>
      </div>
    ),
    align: 'center',
    width: '8%',
    sorter: (a, b) => a.publishDate - b.publishDate,
  },
  {
    title: 'Фото',
    dataIndex: 'imageUrl',
    key: 'imageUrl',
    render: (text, record) => <ImageLoader src={record.imageUrl} alt="Фото" />,
    align: 'center',
    width: '10%',
  },
  {
    title: 'Марка и модель',
    dataIndex: 'name',
    key: 'name',
    render: (text, record) => (
      <a
        href={record.imageUrl}
        style={{
          fontWeight: '500',
          color: '#1677ff',
          textDecoration: 'none',
        }}
      >
        {text}
      </a>
    ),
    align: 'center',
  },
  {
    title: 'Год',
    dataIndex: 'year',
    key: 'year',
    align: 'center',
    width: '5%',
    sorter: (a, b) => a.year - b.year,
  },
  {
    title: (
      <div>
        Цена <InfoCircleOutlined />
      </div>
    ),
    dataIndex: 'price',
    key: 'price',
    render: (text: number, record) => {
      const backgroundColor = record.diff > 10 ? '#ffd1d1' : record.diff < -40 ? '#d2ffd1' : '#f2f2f2';
      return (
        <div
          style={{
            // backgroundColor,
            borderRadius: '7px',
            padding: '5px',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <div style={{ backgroundColor, padding: '5px 10px', borderRadius: '7px', fontWeight: '500' }}>
            {new Intl.NumberFormat('ru-RU').format(text)}
          </div>
        </div>
      );
    },
    align: 'center',
    sorter: (a, b) => a.mileage - b.mileage,
  },
  {
    title: (
      <Tooltip title="Количество владельцев">
        <TeamOutlined />
      </Tooltip>
    ),
    dataIndex: 'ownersCount',
    key: 'ownersCount',
    align: 'center',
    sorter: (a, b) => a.ownersCount - b.ownersCount,
  },
  {
    title: 'Пробег',
    dataIndex: 'mileage',
    key: 'mileage',
    render: (text) => <>{new Intl.NumberFormat('ru-RU').format(text)}</>,
    align: 'center',
    width: '8%',
    sorter: (a, b) => a.mileage - b.mileage,
  },
  {
    title: 'КПП',
    dataIndex: 'transmission',
    key: 'transmission',
    render: (text) => <>{TransmissionTypeRecord[text]}</>,
    align: 'center',
    width: '5%',
    filters: [
      {
        text: 'АТ',
        value: 1,
      },
      {
        text: 'МТ',
        value: 2,
      },
      {
        text: 'Робот',
        value: 3,
      },
    ],
    onFilter: (value, record) => record.transmission === value,
  },
  {
    title: 'Сервис',
    dataIndex: 'fromWhere',
    key: 'fromWhere',
    render: (text, record) => (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {record.imageUrl?.includes('avito') && (
          <img alt="Авито" src="https://fut.ru/media/2022/04/avito.png" style={{ width: '55px' }} />
        )}
        {record.imageUrl?.includes('autoru') && (
          <img alt="Авто.ру" src="https://toplogos.ru/images/logo-auto-ru.png" style={{ width: '65px' }} />
        )}
        {record.imageUrl?.includes('drom') && (
          <img alt="Дром" src="https://razborka.cloud/i/drom.png" style={{ width: '55px' }} />
        )}
      </div>
    ),
    align: 'center',
    width: '5%',
    filters: [
      {
        text: 'Авито',
        value: 'avito',
      },
      {
        text: 'Дром',
        value: 'drom',
      },
      {
        text: 'Авто.ру',
        value: 'autoru',
      },
    ],
    onFilter: (value, record) => record.imageUrl?.includes(value as string),
  },
  {
    title: 'Место',
    dataIndex: 'settlement',
    key: 'settlement',
    align: 'center',
    width: '10%',
    filters: [
      {
        text: 'Москва',
        value: 'Москва',
      },
      {
        text: 'Санкт-Петербург',
        value: 'Санкт-Петербург',
      },
    ],
    onFilter: (value, record) => record.settlement?.includes(value as string),
  },
  {
    title: (
      <Tooltip title="Избранное">
        <InfoCircleOutlined />
      </Tooltip>
    ),
    dataIndex: 'favorite',
    key: 'favorite',
    render: (text, record) => (
      <div
        className={classes.compFavBtn}
        style={{ fontSize: '17px', cursor: 'pointer' }}
        onClick={() => handleChangeFavorite(record.id.toString())}
      >
        {record.isFavorite ? <StarFilled /> : <StarOutlined />}
      </div>
    ),
    align: 'center',
    width: '5%',
  },
  {
    title: (
      <Tooltip title="Сравнение">
        <InfoCircleOutlined />
      </Tooltip>
    ),
    dataIndex: 'compared',
    key: 'compared',
    render: (text, record) => (
      <div
        className={classes.compFavBtn}
        style={{ fontSize: '17px', cursor: 'pointer' }}
        onClick={() => handleChangeCompared(record.id.toString())}
      >
        {record.isCompared ? <CheckCircleFilled /> : <CheckCircleOutlined />}
      </div>
    ),
    align: 'center',
    width: '5%',
  },
];

export const locale: TableLocale = {
  emptyText: 'По Вашему запросу ничего не найдено',
  filterReset: 'Сбросить',
};

export const TransmissionTypeRecord: Record<string, string> = {
  1: 'АТ',
  2: 'МТ',
  3: 'Робот',
  4: 'Вар.',
};
