import {
  CheckCircleFilled,
  CheckCircleOutlined,
  QuestionCircleOutlined,
  StarFilled,
  StarOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { CollapseProps, Spin, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { ICar } from '@state/cars/types';
import { TableLocale } from 'antd/es/table/interface';
import { format } from 'date-fns';
import { useState } from 'react';
import Filters from './Filters';
import classes from './FindCars.module.scss';

const ImageLoader = ({ src, alt }: { src: string; alt: string }) => {
  const [loading, setLoading] = useState(true); // Состояние для отслеживания загрузки картинки

  return (
    <div>
      {loading && <Spin />} {/* Отображаем спиннер, пока картинка загружается */}
      <img
        src={src}
        alt={alt}
        style={{ display: loading ? 'none' : 'block', width: '90px', height: '68px', borderRadius: '10px' }} // Скрываем картинку, пока она загружается
        onLoad={() => setLoading(false)} // Как только картинка загрузилась, убираем спиннер
      />
    </div>
  );
};

export default ImageLoader;

export const columns = (
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
        <div style={{ color: 'black', fontWeight: '500' }}>
          {format(new Date(record.publishDate), 'HH:mm:ss')}
        </div>
        <div style={{ color: 'grey' }}>{format(new Date(record.publishDate), 'dd/MM/yyyy')}</div>
      </div>
    ),
    align: 'center',
    width: '8%',
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
    align: 'center',
  },
  {
    title: 'Место',
    dataIndex: 'settlement',
    key: 'settlement',
    align: 'center',
  },
  {
    title: 'Цена',
    dataIndex: 'price',
    key: 'price',
    align: 'center',
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
  },
  {
    title: 'Год',
    dataIndex: 'year',
    key: 'year',
    align: 'center',
    width: '5%',
  },
  {
    title: 'Пробег',
    dataIndex: 'mileage',
    key: 'mileage',
    align: 'center',
    width: '8%',
  },
  {
    title: 'КПП',
    dataIndex: 'transmission',
    key: 'transmission',
    render: (text) => <>{TransmissionTypeRecord[text]}</>,
    align: 'center',
  },
  {
    title: 'Сервис',
    dataIndex: 'fromWhere',
    key: 'fromWhere',
    render: (text, record) => (
      <>
        {record.imageUrl.includes('avito') && 'Авито'}
        {record.imageUrl.includes('autoru') && 'Авто.ру'}
        {record.imageUrl.includes('drom') && 'Дром'}
        {/* {record.imageUrl.includes('youla') && 'Юла'} */}
      </>
    ),
    align: 'center',
  },
  {
    title: (
      <Tooltip title="Избранное">
        <QuestionCircleOutlined />
      </Tooltip>
    ),
    dataIndex: 'favorite',
    key: 'favorite',
    render: (text, record) => (
      // <Tooltip title="Избранное">
      <div
        className={classes.compFavBtn}
        style={{ fontSize: '17px', cursor: 'pointer' }}
        onClick={() => handleChangeFavorite(record.id.toString())}
      >
        {record.isFavorite ? <StarFilled /> : <StarOutlined />}
      </div>
      // </Tooltip>
    ),
    align: 'center',
  },
  {
    title: (
      <Tooltip title="Сравнение">
        <QuestionCircleOutlined />
      </Tooltip>
    ),
    dataIndex: 'compared',
    key: 'compared',
    render: (text, record) => (
      // <Tooltip title="Сравнение">
      <div
        className={classes.compFavBtn}
        style={{ fontSize: '17px', cursor: 'pointer' }}
        onClick={() => handleChangeCompared(record.id.toString())}
      >
        {record.isCompared ? <CheckCircleFilled /> : <CheckCircleOutlined />}
      </div>
      // </Tooltip>
    ),
    align: 'center',
  },
];

export const locale: TableLocale = {
  emptyText: 'По Вашему запросу ничего не найдено',
};

export const collapseItems: CollapseProps['items'] = [
  {
    key: 'carsFilter',
    label: 'Фильтры поиска',
    children: <Filters />,
  },
];

export const TransmissionTypeRecord: Record<string, string> = {
  1: 'Автомат',
  2: 'Механика',
  3: 'Робот',
  4: 'Вариатор',
};
