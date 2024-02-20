import { Button, Form, Input } from 'antd';
import React, { FC } from 'react';

type LoginAndPassword = {
  username: string;
  password: string;
};

export const Login: FC = () => {
  const onFinish = (values: LoginAndPassword) => {
    console.log('Received values of form: ', values);
    // Здесь вы можете обработать данные формы, например, отправить их на сервер
  };

  return (
    <div style={{ maxWidth: '300px', margin: 'auto', marginTop: '50px' }}>
      <Form name="login_form" initialValues={{ remember: true }} onFinish={onFinish}>
        <Form.Item name="username" rules={[{ required: true, message: 'Пожалуйста, введите имя пользователя!' }]}>
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
      </Form>
    </div>
  );
};

export default Login;
