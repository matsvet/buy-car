import './App.css';
import { Header } from './routes/Header/Header';
import { Navigate, Route, Routes } from 'react-router-dom';
import IncorrectRoute from './routes/IncorrectRoute';
import Login from './routes/Login';

function App() {
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
}

export default App;
