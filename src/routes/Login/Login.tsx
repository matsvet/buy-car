import { AppDispatch } from '@store';
import { Button, Form, Input } from 'antd';
import { selectUser } from '@state/user/selectors';
import { signInWithGoogle, signOut } from '@state/user/thunks';
import { useDispatch, useSelector } from 'react-redux';
import React, { FC } from 'react';
import classes from './Login.module.scss';

// type LoginAndPassword = {
//   username: string;
//   password: string;
// };

export const Login: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector(selectUser);

  const onFinish = () =>
    // values: LoginAndPassword
    {
      // console.log('Received values of form: ', values);
      // Здесь можно обработать данные формы, например, отправить их на сервер
    };

  const handleSignInWithGoogle = () => {
    dispatch(signInWithGoogle());
  };

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <div className={classes.root}>
      {!user ? (
        <Form name="login_form" initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Пожалуйста, введите имя пользователя!' }]}
          >
            <Input placeholder="Имя пользователя" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Пожалуйста, введите ваш пароль!' }]}>
            <Input.Password placeholder="Пароль" />
          </Form.Item>
          <Form.Item>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button type="primary" htmlType="submit" size="large">
                Войти
              </Button>
              <Button type="primary" onClick={handleSignInWithGoogle} size="large">
                Войти через Google
              </Button>
            </div>
          </Form.Item>
        </Form>
      ) : (
        <div className={classes.root__profileBlock}>
          <div>{user?.displayName}</div>
          <div>{user?.email}</div>
          <Button type="primary" onClick={handleSignOut} size="large">
            Выйти
          </Button>
        </div>
      )}
    </div>
  );
};

export default Login;
