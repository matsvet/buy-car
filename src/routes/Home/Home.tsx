import React from 'react';

import { Carousel } from 'antd';
import { selectUser } from '@state/user/selectors';
import { useSelector } from 'react-redux';
import classes from './Home.module.scss';

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '560px',
  color: '#7e7e7e',
  lineHeight: '560px',
  textAlign: 'center',
  background: '#eceeff',
  borderRadius: '30px',
  fontSize: '30px',
};

const Home = () => {
  const user = useSelector(selectUser);

  return (
    <div className={classes.root}>
      <Carousel autoplay effect="fade">
        <div>
          <h3 style={contentStyle}>Добро пожаловать{user?.displayName ? `, ${user.displayName}` : ''}!</h3>
        </div>
        <div>
          <h3 style={contentStyle}>Найди автомобиль своей мечты!</h3>
        </div>
        <div>
          <h3 style={contentStyle}>Тщательный отбор по Вашим критериям</h3>
        </div>
        <div>
          <h3 style={contentStyle}>Поисковик автомобилей с пробегом</h3>
        </div>
      </Carousel>
    </div>
  );
};

export default Home;
