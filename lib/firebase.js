import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDReA-v0I3J_-CbOOpPsmn_x4us4a1_UF8",
    authDomain: "chess-nandanvarma.firebaseapp.com",
    databaseURL: "https://chess-nandanvarma-default-rtdb.firebaseio.com",
    projectId: "chess-nandanvarma",
    storageBucket: "chess-nandanvarma.appspot.com",
    messagingSenderId: "1022610696614",
    appId: "1:1022610696614:web:8e0176f9e2bd4744174767"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

export default firebase;