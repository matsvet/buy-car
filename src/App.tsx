import { AppDispatch } from '@store';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Spin } from 'antd';
import { createGlobalStyle } from 'styled-components';
import { selectVerifyAuthLoading } from '@state/user/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { verifyAuthState } from '@state/user/thunks';
import FindCars from './routes/FindCars';
import Header from './Components/Header/Header';
import IncorrectRoute from './routes/IncorrectRoute';
import LeftSidebar from './Components/LeftSidebar/LeftSidebar';
import Login from './routes/Login';
import Settings from './routes/Settings';
import classes from './App.module.scss';

const GlobalStyle = createGlobalStyle`
  .ant-spin-dot-item {
    background-color: #2a2a2a !important;
  }
`;

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  const verifyAuthLoading = useSelector(selectVerifyAuthLoading);

  useEffect(() => {
    dispatch(verifyAuthState());
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <GlobalStyle />
      <div className={classes.root__header}>
        <Header />
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
