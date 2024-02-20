import { App, Button } from 'antd';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './Header.module.scss';

// import useModal from 'antd/es/modal/useModal';
// import useNotification from 'antd/es/notification/useNotification';

const Header: FC = () => {
  const navigate = useNavigate();

  const { message, modal, notification } = App.useApp();
  // const notification = useNotification();
  // const modal = useModal();

  // const goToSettings = () => {
  //   navigate('/settings');
  // };
  const goToFindCars = () => {
    navigate('/find-cars');
  };
  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className={classes.root}>
      Header
      {/* <Button
        onClick={() => {
          message.error('KKKK');
          modal.warning({ title: 'This is a warning message', content: 'some messages...some messages...' });
          notification.success({
            message: `Notification topLeft`,
            description: 'Hello, Ant Design!!',
            placement: 'topLeft',
          });
        }}
      >
        Modal
      </Button> */}
      <Button onClick={goToFindCars}>Поиск</Button>
      <Button onClick={goToLogin}>Профиль</Button>
    </div>
  );
};

export default Header;
