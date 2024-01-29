import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyC-Wfdna7nLJKKEnY6OlWCEoqVvR7zoKPM',
  authDomain: 'trunghoangphat.firebaseapp.com',
  projectId: 'trunghoangphat',
  storageBucket: 'trunghoangphat.appspot.com',
  messagingSenderId: '577621675234',
  appId: '1:577621675234:web:cd54f4eac0443cccbfe2bb',
  measurementId: 'G-Q29SWGL644'
};

export const app = initializeApp(firebaseConfig);
