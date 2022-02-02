import React, { createContext } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOfQX6PiTAOhpwFMlD8VFDx1IDZcsxwcQ",
  authDomain: "chat-react-83756.firebaseapp.com",
  projectId: "chat-react-83756",
  storageBucket: "chat-react-83756.appspot.com",
  messagingSenderId: "948874098279",
  appId: "1:948874098279:web:6a5c101a15673fefd6c6c2",
  measurementId: "G-31LVEWR9Z8",
};

firebase.initializeApp(firebaseConfig);

export const Context = createContext(null);

const auth = firebase.auth();
const firestore = firebase.firestore();

ReactDOM.render(
  <Context.Provider
    value={{
      firebase,
      auth,
      firestore,
    }}
  >
    <App />
  </Context.Provider>,
  document.getElementById("root")
);
