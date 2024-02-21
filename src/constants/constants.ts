import { createGlobalStyle } from 'styled-components';

export const backURL = 'http://127.0.0.1:5000';

export const GlobalStyle = createGlobalStyle`
  .ant-spin-dot-item {
    background-color: #2a2a2a !important;
  }
`;

export const pageTitles: Record<string, string> = {
  '/find-cars': 'Поиск авто',
  '/favorite-cars': 'Избранные авто',
  '/compared-cars': 'Сравниваемые авто',
  '/home': 'Домашняя страница',
  '/settings': 'Настройки',
  '/login': 'Авторизация',
  '/incorrect-route': '404 Page Not Found',
};
