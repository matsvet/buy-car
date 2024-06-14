import { AppDispatch } from '@store';
import { Button, Form, Input } from 'antd';
import { selectUser } from '@state/user/selectors';
import { signInWithGoogle, signOut } from '@state/user/thunks';
import { useDispatch, useSelector } from 'react-redux';
import React, { FC } from 'react';
import classes from './Login.module.scss';

export const Login: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector(selectUser);

  const handleSignInWithGoogle = () => {
    void dispatch(signInWithGoogle());
  };

  const handleSignOut = () => {
    void dispatch(signOut());
  };

  return (
    <div className={classes.root}>
      {!user ? (
        <Form name="login_form" initialValues={{ remember: true }}>
          <div className={classes.root__formContainer}>
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Пожалуйста, введите имя пользователя!' }]}
            >
              <Input placeholder="Имя пользователя" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Пожалуйста, введите ваш пароль!' }]}
            >
              <Input.Password placeholder="Пароль" />
            </Form.Item>
            <Form.Item>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: '10px' }}>
                  <Button type="default" htmlType="submit" size="large">
                    Войти
                  </Button>
                  <Button type="default" onClick={handleSignInWithGoogle} size="large">
                    Войти с помощью Google
                  </Button>
                </div>
                <Button
                  type="primary"
                  onClick={handleSignInWithGoogle}
                  size="large"
                  style={{ backgroundColor: 'grey' }}
                >
                  Зарегистрироваться
                </Button>
              </div>
            </Form.Item>
          </div>
        </Form>
      ) : (
        <div className={classes.root__profileBlock}>
          <div className={classes.root__nameAndEmailContainer}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              {user && (
                <img
                  style={{ width: '40px', height: '40px', borderRadius: '20px' }}
                  src={user?.photoURL ?? ''}
                />
              )}
              <div>{user?.displayName}</div>
            </div>
            <div>{user?.email}</div>
          </div>
          <Button type="default" onClick={handleSignOut} size="large">
            Изменить пароль
          </Button>
          <Button type="default" onClick={handleSignOut} size="large">
            Изменить номер телефона
          </Button>
          <Button type="default" onClick={handleSignOut} size="large" danger>
            Выйти
          </Button>
        </div>
      )}
    </div>
  );
};

export default Login;
