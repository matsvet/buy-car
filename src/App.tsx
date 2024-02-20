import './App.css';
import { AppDispatch } from '@store';
import { Header } from './routes/Header/Header';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Spin } from 'antd';
import { selectVerifyAuthLoading } from '@state/user/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { verifyAuthState } from '@state/user/thunks';
import IncorrectRoute from './routes/IncorrectRoute';
import Login from './routes/Login';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  const verifyAuthLoading = useSelector(selectVerifyAuthLoading);

  useEffect(() => {
    dispatch(verifyAuthState());
  }, [dispatch]);

  if (verifyAuthLoading)
    return (
      <div>
        <Spin />
      </div>
    );

  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/incorrect-route" element={<IncorrectRoute />} />
        {/* <PrivateRoute exact path="/" component={Sessions} />
        <PrivateRoute exact path="/workers" component={Workers} />
        <CustomPrivateRoute
          exact
          path="/workers-settings"
          component={WorkersSettings}
          checkCustomPermissions={checkWorkersSettingsPermission}
        />
        <SystemPrivateRoute exact path="/rights" component={TableRights} />
        <SystemPrivateRoute exact path="/domains" component={TableDomain} />
        <SystemPrivateRoute exact path="/users" component={TableUsers} />
        <SystemPrivateRoute exact path="/settings" component={TableSettings} />
        <SystemPrivateRoute exact path="/activity-log" component={ActivityLog} />
        <SystemPrivateRoute exact path="/deleted-sessions" component={DeletedSessions} /> */}

        {/* обработка некорректного url */}
        <Route path="*" element={<Navigate to="/incorrect-route" replace />} />
      </Routes>
    </>
  );
};

export default App;
