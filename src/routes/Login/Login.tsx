import { AppDispatch } from '@store';
import { Button, Form, Input } from 'antd';
import { selectUser } from '@state/user/selectors';
import { signInWithGoogle, signOut } from '@state/user/thunks';
import { useDispatch, useSelector } from 'react-redux';
import React, { FC } from 'react';
import classes from './Login.module.scss';

type LoginAndPassword = {
  username: string;
  password: string;
};

export const Login: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector(selectUser);

  const onFinish = (values: LoginAndPassword) => {
    console.log('Received values of form: ', values);
    // Здесь вы можете обработать данные формы, например, отправить их на сервер
  };

  const handleSignInWithGoogle = () => {
    dispatch(signInWithGoogle());
  };

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <div>
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
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Войти
            </Button>
          </Form.Item>
          <Button type="primary" onClick={handleSignInWithGoogle} style={{ width: '100%' }}>
            Войти через Google
          </Button>
        </Form>
      ) : (
        <div>
          <div>{user?.displayName}</div>
          <div>{user?.email}</div>
          <Button type="primary" onClick={handleSignOut} style={{ width: '100%' }}>
            Выйти
          </Button>
        </div>
      )}
    </div>
  );
};

export default Login;
