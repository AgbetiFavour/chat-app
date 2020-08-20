import React from 'react';
import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDnxPJ_-I6P1vR_E9ohpWCdyMqFZJeSDQY",
    authDomain: "webapp-3732e.firebaseapp.com",
    databaseURL: "https://webapp-3732e.firebaseio.com",
    projectId: "webapp-3732e",
    storageBucket: "webapp-3732e.appspot.com",
    messagingSenderId: "604359113377",
    appId: "1:604359113377:web:711ab83065a1bd44b88ee0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase;
  
