import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Pegamos aquí el código generado en Firebase al crear la app de Firebase

/* const firebaseConfig = {
  apiKey: "AIzaSyB6feDYQKoUua_pxZ4PKClzXE1jf93EayA",
  authDomain: "react-apps-d3b9a.firebaseapp.com",
  projectId: "react-apps-d3b9a",
  storageBucket: "react-apps-d3b9a.appspot.com",
  messagingSenderId: "1060053174962",
  appId: "1:1060053174962:web:4eab4b45ef17e19657d7ab"
};

// Aquí el código de la app de testing de Firebase

const firebaseTestingConfig = {
  apiKey: "AIzaSyBv-dm2JKWeYPrzx0Nx2qI2mZ8gJfY-c4k",
  authDomain: "angular-login-app-5f258.firebaseapp.com",
  databaseURL: "https://angular-login-app-5f258.firebaseio.com",
  projectId: "angular-login-app-5f258",
  storageBucket: "angular-login-app-5f258.appspot.com",
  messagingSenderId: "271009486279",
  appId: "1:271009486279:web:846e1ada8858affb4ff5e2"
};

// console.log(process.env.NODE_ENV);

if ( process.env.NODE_ENV === 'test' ) {

  // Estamos en pruebas, usamos otra base de datos de Firebase

  firebase.initializeApp( firebaseTestingConfig );

} else {

  // Estamos en desarrollo o producción

  // Initialize Firebase
  firebase.initializeApp( firebaseConfig );

} */

// Variables de entorno

// console.log( process.env );

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase

firebase.initializeApp( firebaseConfig );



// Creamos base de datos según documentación, firestore es la base de datos de Firebase

const db = firebase.firestore();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
