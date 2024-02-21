import { ColumnsType } from 'antd/es/table';
import { CollapseProps, Spin } from 'antd';
import { TableLocale } from 'antd/es/table/interface';
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
    width: '10%',
  },
  {
    title: 'Марка',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Место',
    dataIndex: 'settlement',
    key: 'settlement',
  },
  {
    title: 'Цена',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Владельцев',
    dataIndex: 'ownersCount',
    key: 'ownersCount',
  },
  {
    title: 'Год',
    dataIndex: 'year',
    key: 'year',
    width: '5%',
  },
  {
    title: 'Пробег',
    dataIndex: 'mileage',
    key: 'mileage',
    width: '8%',
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
