import React from 'react';

import { Carousel } from 'antd';
import { selectUser } from '@state/user/selectors';
import { useSelector } from 'react-redux';
import classes from './Home.module.scss';

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '460px',
  color: '#7e7e7e',
  lineHeight: '460px',
  textAlign: 'center',
  background: '#eceeff',
  borderRadius: '30px',
  fontSize: '30px',
};

const contentStyleWithBackground = (imageUrl: string): React.CSSProperties => ({
  ...contentStyle,
  backgroundImage: `url(${imageUrl})`,
  backgroundSize: 'cover', // чтобы изображение покрывало весь фон
  backgroundPosition: 'center', // центрирование изображения
  color: 'white', // измените цвет текста, если необходимо
  lineHeight: 'normal', // сброс lineHeight для вмещения подзаголовка
  // padding: '20px', // добавление отступов
  display: 'flex', // использование flexbox для вертикального выравнивания
  flexDirection: 'column', // элементы будут расположены вертикально
  justifyContent: 'center', // выравнивание содержимого по центру
  alignItems: 'center', // выравнивание элементов по центру
  height: '460px', // высота слайда
  borderRadius: '30px', // скругление углов
});

const Home = () => {
  const user = useSelector(selectUser);

  return (
    <div className={classes.root}>
      <div className={classes.root__carouselContainer}>
        <Carousel autoplay effect="fade">
          <div>
            <span
              style={contentStyleWithBackground(
                'https://i.postimg.cc/TwFRWp9n/1667501737-11-sportishka-com-p-mashina-bazara-pinterest-12.jpg',
              )}
            >
              <span className={classes.root__text}>
                <h3>Поисковик автомобилей с пробегом</h3>
                <>Добро пожаловать{user?.displayName ? `, ${user.displayName}` : ''}!</>
              </span>
            </span>
          </div>
          <div>
            <span
              style={contentStyleWithBackground(
                'https://i.postimg.cc/k5jMqjR1/2d9c3444f3aab3f124c61095adad8e3e.webp',
              )}
            >
              <span className={classes.root__text}>
                <h3>Найди автомобиль своей мечты!</h3>
                <>Большой выбор, полная прозрачность истории</>
              </span>
            </span>
          </div>
          <div>
            <span
              style={contentStyleWithBackground(
                'https://i.postimg.cc/mDtLDQQb/c7652bccf0ed8d1a608532b9d35a1b79.jpg',
              )}
            >
              <span className={classes.root__text}>
                <h3>Тщательный отбор по Вашим критериям</h3>
                <>Удобный фильтр и сравнение предложений</>
              </span>
            </span>
          </div>
          <div>
            <span style={contentStyleWithBackground('https://i.postimg.cc/Y0FtNMnZ/prodaja-bu-avto.jpg')}>
              <span className={classes.root__text}>
                <h3>Надежный партнер в мире автомобилей</h3>
                <>Найдите свой авто за несколько кликов</>
              </span>
            </span>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Home;
