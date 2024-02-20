// import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth'; // Импорт модуля аутентификации
import { initializeApp } from 'firebase/app';

// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyCYBAkx83ZIZPxy9oCz04-9LD5AMRJwjkE',
  authDomain: 'buy-car-2024.firebaseapp.com',
  projectId: 'buy-car-2024',
  storageBucket: 'buy-car-2024.appspot.com',
  messagingSenderId: '67645755480',
  appId: '1:67645755480:web:a3fc791ffc0289bab53a2d',
  measurementId: 'G-7TZL3Z13GW',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export const analytics = getAnalytics(app);
