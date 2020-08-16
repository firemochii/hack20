import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";

const config = {
    apiKey: "AIzaSyAmrMqdKcZw3XKVfS_4xYs2VX88h5r1H4M",
    authDomain: "supportivechat.firebaseapp.com",
    databaseURL: "https://supportivechat.firebaseio.com"
  };
  firebase.initializeApp(config);
  export const auth = firebase.auth;
  export const db = firebase.database();
