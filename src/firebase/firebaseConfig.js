// import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = app.auth();
export default app;
