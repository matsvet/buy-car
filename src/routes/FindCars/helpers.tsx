import {
  CheckCircleFilled,
  CheckCircleOutlined,
  CopyOutlined,
  InfoCircleOutlined,
  StarFilled,
  StarOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { CollapseProps, Dropdown, Spin, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { ICar } from '@state/cars/types';
import { TableLocale } from 'antd/es/table/interface';
import { format } from 'date-fns';
import { useState } from 'react';
import Filters from './Filters';
import classes from './FindCars.module.scss';

export const ImageLoader = ({ src, alt }: { src: string; alt: string }) => {
  const [loading, setLoading] = useState(true); // Состояние для отслеживания загрузки картинки

  return (
    // Отображаем спиннер, пока картинка загружается
    <div>
      {loading && <Spin />}
      <img
        src={src}
        alt={alt}
        style={{
          display: loading ? 'none' : 'block',
          width: '90px',
          height: '68px',
          borderRadius: '10px',
          objectFit: 'cover',
        }} // Скрываем картинку, пока она загружается
        onLoad={() => setLoading(false)} // Как только картинка загрузилась, убираем спиннер
      />
      {!loading && (
        <span
          style={{
            backgroundImage: src,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '90px',
            height: '68px',
          }}
        ></span>
      )}
    </div>
  );
};

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
        <div style={{ fontWeight: '500' }}>{format(new Date(record.publishDate), 'HH:mm:ss')}</div>
        <div style={{ color: '#767289' }}>{format(new Date(record.publishDate), 'dd/MM/yyyy')}</div>
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
    render: (text, record) => (
      <a
        href={record.url ?? record.imageUrl}
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
      let backgroundColor = record.diff > 10 ? '#ffd1d1' : record.diff < -70 ? '#d2ffd1' : '#f2f2f2';
      if (record.ownersCount === 5 || record.isBroked) {
        backgroundColor = '#f2f2f2';
      }
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
    title: 'Пробег',
    dataIndex: 'mileage',
    key: 'mileage',
    render: (text) => <>{new Intl.NumberFormat('ru-RU').format(text)}</>,
    align: 'center',
    width: '8%',
  },
  {
    title: 'КПП',
    dataIndex: 'transmission',
    key: 'transmission',
    render: (text) => <>{TransmissionTypeRecord[text]}</>,
    align: 'center',
    width: '5%',
  },
  {
    title: 'Сервис',
    dataIndex: 'fromWhere',
    key: 'fromWhere',
    render: (text, record) => (
      <>
        {record.hasDouble && record.mileage > 150000 && record.mileage < 190000 ? (
          <Dropdown
            trigger={['contextMenu', 'click']}
            menu={{
              items: [
                {
                  key: 'note1',
                  label: (
                    <a href={record.url ?? record.imageUrl} style={{ color: 'blue' }}>
                      Авито
                    </a>
                  ),
                  onClick: (e) => (e as unknown as MouseEvent).stopPropagation(),
                },
                {
                  key: 'note2',
                  label: (
                    <a href={record.imageUrl} style={{ color: 'blue' }}>
                      Дром
                    </a>
                  ),
                  onClick: (e) => (e as unknown as MouseEvent).stopPropagation(),
                },
              ],
            }}
            overlayStyle={{ width: '100px' }}
            placement="topCenter"
          >
            <CopyOutlined />
          </Dropdown>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {record.imageUrl?.includes('avito') && (
              <img alt="Авито" src="https://fut.ru/media/2022/04/avito.png" style={{ width: '55px' }} />
            )}
            {record.imageUrl?.includes('autoru') && (
              <img
                alt="Авто.ру"
                src="https://toplogos.ru/images/logo-auto-ru.png"
                style={{ width: '65px' }}
              />
            )}
            {record.imageUrl?.includes('drom') && (
              <img alt="Дром" src="https://razborka.cloud/i/drom.png" style={{ width: '55px' }} />
            )}
          </div>
        )}
      </>
    ),
    align: 'center',
    width: '5%',
  },
  {
    title: 'Место',
    dataIndex: 'settlement',
    key: 'settlement',
    align: 'center',
    width: '10%',
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
  cancelSort: 'Сбросить сортировку',
  triggerDesc: 'Сортировка по убыванию',
  triggerAsc: 'Сортировка по возрастанию',
};

export const collapseItems = (): CollapseProps['items'] => [
  {
    key: 'carsFilter',
    label: `Фильтры поиска`,
    children: <Filters />,
  },
];

export const TransmissionTypeRecord: Record<string, string> = {
  1: 'АТ',
  2: 'МТ',
  3: 'Робот',
  4: 'Вар.',
};
