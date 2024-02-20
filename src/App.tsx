import { AppDispatch } from '@store';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Spin } from 'antd';
import { selectVerifyAuthLoading } from '@state/user/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { verifyAuthState } from '@state/user/thunks';
import FindCars from './routes/FindCars';
import Header from './Components/Header/Header';
import IncorrectRoute from './routes/IncorrectRoute';
import LeftSidebar from './Components/LeftSidebar/LeftSidebar';
import Login from './routes/Login';
import classes from './App.module.scss';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  const verifyAuthLoading = useSelector(selectVerifyAuthLoading);

  useEffect(() => {
    dispatch(verifyAuthState());
  }, [dispatch]);

  return (
    <div className={classes.rootHeaderWithContent}>
      <div className={classes.rootHeaderWithContent__header}>
        <Header />
      </div>
      <div className={classes.rootHeaderWithContent__mainContent}>
        <div className={classes.rootHeaderWithContent__mainContent__sidebar}>
          <LeftSidebar />
        </div>
        <div className={classes.rootHeaderWithContent__mainContent__withoutSidebar}>
          {verifyAuthLoading ? (
            <Spin size="large" />
          ) : (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/find-cars" element={<FindCars />} />

              {/* обработка некорректного url */}
              <Route path="/incorrect-route" element={<IncorrectRoute />} />
              <Route path="*" element={<Navigate to="/incorrect-route" replace />} />
            </Routes>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
