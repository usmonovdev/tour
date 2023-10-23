import { initializeApp } from 'firebase/app';

export function initializeFirebaseApp() {
  const firebaseConfig = {
    apiKey: 'AIzaSyDwGoulr4Xbek4UC5dFm4pUYbH_W2vAdfE',
    authDomain: 'travel-4220c.firebaseapp.com',
    projectId: 'travel-4220c',
    storageBucket: 'travel-4220c.appspot.com',
    messagingSenderId: '625262299632',
    appId: '1:625262299632:web:17713ee3b94bbdb1e07535',
    measurementId: 'G-PFXGHLWD0Q',
  };
  initializeApp(firebaseConfig);
}
