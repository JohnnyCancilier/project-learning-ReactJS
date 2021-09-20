import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAKaY42w4br1zGvscbqOM_G_xJGyf_7Wm4",
    authDomain: "letmeask-web-project.firebaseapp.com",
    databaseURL: "https://letmeask-web-project-default-rtdb.firebaseio.com",
    projectId: "letmeask-web-project",
    storageBucket: "letmeask-web-project.appspot.com",
    messagingSenderId: "735629142046",
    appId: "1:735629142046:web:3c11a1e98f89e55302660f"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database;