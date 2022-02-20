// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyAgXu1pr9PkY5Nt76sFzQ3elhxDGFi1aHA",

  authDomain: "play-track-e48e2.firebaseapp.com",

  projectId: "play-track-e48e2",

  storageBucket: "play-track-e48e2.appspot.com",

  messagingSenderId: "408408388304",

  appId: "1:408408388304:web:273357c59a4782c44824d5"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default function getFirestoreApp() {
  return app
}