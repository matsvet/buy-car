import { CollapseProps, Spin, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { TableLocale } from 'antd/es/table/interface';
import { CheckCircleOutlined, StarOutlined, TeamOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Filters from './Filters';

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

// todo странная типизация
export const columns: ColumnsType<any> = [
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
    render: (text, record) => <>{TransmissionTypeRecord[text]}</>,
    align: 'center',
  },
  {
    title: '',
    dataIndex: 'favorite',
    key: 'favorite',
    render: (text, record) => (
      <Tooltip title="Избранное">
        <StarOutlined style={{ fontSize: '17px' }} onClick={alert} />
      </Tooltip>
    ),
    align: 'center',
  },
  {
    title: '',
    dataIndex: 'compared',
    key: 'compared',
    render: (text, record) => (
      <Tooltip title="Сравнение">
        <CheckCircleOutlined style={{ fontSize: '17px' }} onClick={alert} />
      </Tooltip>
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
