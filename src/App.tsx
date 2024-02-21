import { AppDispatch } from '@store';
import { GlobalStyle, pageTitles } from './constants/constants';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import { selectVerifyAuthLoading } from '@state/user/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { verifyAuthState } from '@state/user/thunks';
import FindCars from './routes/FindCars';
import Header from './Components/Header/Header';
import Home from './routes/Home';
import IncorrectRoute from './routes/IncorrectRoute';
import LeftSidebar from './Components/LeftSidebar/LeftSidebar';
import Login from './routes/Login';
import Settings from './routes/Settings';
import classes from './App.module.scss';

const App = () => {
  const [currentAppPage, setCurrentAppPage] = useState('Home');

  const location = useLocation();

  const dispatch = useDispatch<AppDispatch>();

  const verifyAuthLoading = useSelector(selectVerifyAuthLoading);

  useEffect(() => {
    dispatch(verifyAuthState());
  }, [dispatch]);

  useEffect(() => {
    const pageTitle = pageTitles[location.pathname] || 'App';
    setCurrentAppPage(pageTitle);
  }, [location.pathname]);

  return (
    <div className={classes.root}>
      <GlobalStyle />
      <div className={classes.root__header}>
        <Header currentPage={currentAppPage} />
      </div>
      <div className={classes.root__container}>
        <div className={classes.root__container__sidebar}>
          <LeftSidebar />
        </div>
        <div className={classes.root__container__mainContent}>
          {verifyAuthLoading ? (
            <div className={classes.root__container__mainContent__loader}>
              <Spin size="large" />
            </div>
          ) : (
            <div className={classes.root__container__mainContent__routes}>
              <Routes>
                <Route path="/find-cars" element={<FindCars />} />
                <Route path="/favorite-cars" element={<Settings />} />
                <Route path="/compared-cars" element={<Settings />} />
                <Route path="/home" element={<Home />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/login" element={<Login />} />

                {/* обработка некорректного url */}
                <Route path="/incorrect-route" element={<IncorrectRoute />} />
                <Route path="*" element={<Navigate to="/incorrect-route" replace />} />
              </Routes>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
