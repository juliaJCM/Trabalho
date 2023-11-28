import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCnHHKBY8q8oBrJ5_oYFSXjTD80Z8XHkts",
  authDomain: "trabalhopratico-7c340.firebaseapp.com",
  projectId: "trabalhopratico-7c340",
  storageBucket: "trabalhopratico-7c340.appspot.com",
  messagingSenderId: "1025310077592",
  appId: "1:1025310077592:web:3f241139db69f258d3d6ed",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
