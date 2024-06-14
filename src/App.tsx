import './transitions.css';
import { AppDispatch } from '@store';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { GlobalStyle, pageTitles } from './constants/constants';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import { selectVerifyAuthLoading } from '@state/user/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { verifyAuthState } from '@state/user/thunks';
import ComparedCars from './routes/ComparedCars';
import Estimation from './routes/Estimation';
import FavoriteCars from './routes/FavoriteCars';
import FindCars from './routes/FindCars';
import Header from './Components/Header/Header';
import Home from './routes/Home';
import IncorrectRoute from './routes/IncorrectRoute';
import LeftSidebar from './Components/LeftSidebar/LeftSidebar';
import Login from './routes/Login';
import News from './routes/News';
import Notifications from './routes/Notifications';
import Settings from './routes/Settings';
import classes from './App.module.scss';

const App = () => {
  const [currentAppPage, setCurrentAppPage] = useState('Home');

  const location = useLocation();

  const dispatch = useDispatch<AppDispatch>();

  const verifyAuthLoading = useSelector(selectVerifyAuthLoading);

  useEffect(() => {
    void dispatch(verifyAuthState());
  }, [dispatch]);

  useEffect(() => {
    const pageTitle = pageTitles[location.pathname] || 'App';
    setCurrentAppPage(pageTitle);
  }, [location.pathname]);

  return (
    <div className={classes.root}>
      <GlobalStyle />
      <div className={classes.root__header}>
        <Header
          currentPage={currentAppPage}
          location={location as unknown as { path: string; key: string }}
        />
      </div>
      <div className={classes.root__container}>
        <div className={classes.root__container__sidebar}>
          <LeftSidebar pathname={location.pathname} />
        </div>
        <div className={classes.root__container__mainContent}>
          {verifyAuthLoading ? (
            <div className={classes.root__container__mainContent__loader}>
              <Spin size="large" />
            </div>
          ) : (
            <div className={classes.root__container__mainContent__routes}>
              <SwitchTransition mode="out-in">
                <CSSTransition key={location.key} classNames="fade" timeout={200} appear={true}>
                  <Routes location={location}>
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/find-cars" element={<FindCars />} />
                    <Route path="/favorite-cars" element={<FavoriteCars />} />
                    <Route path="/compared-cars" element={<ComparedCars />} />
                    <Route path="/estimation" element={<Estimation />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/login" element={<Login />} />

                    {/* обработка некорректного url */}
                    <Route path="/incorrect-route" element={<IncorrectRoute />} />
                    <Route path="*" element={<Navigate to="/incorrect-route" replace />} />
                  </Routes>
                </CSSTransition>
              </SwitchTransition>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
