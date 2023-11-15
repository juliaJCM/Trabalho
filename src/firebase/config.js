import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1i-kcbGXVNweFaHSMNS8N_2TlowVAP98",
  authDomain: "trabalhopratico-ced1f.firebaseapp.com",
  databaseURL: "https://trabalhopratico-ced1f-default-rtdb.firebaseio.com",
  projectId: "trabalhopratico-ced1f",
  storageBucket: "trabalhopratico-ced1f.appspot.com",
  messagingSenderId: "363198012550",
  appId: "1:363198012550:web:14702bb1df00f568710507",
  measurementId: "G-EYL3GEZC9H"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };