import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

//firebase
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBP-wjUxt2-BLdot7ZTLJw00vyG-ZsYAXc",
  authDomain: "proyectoreact-f6b78-da55a.firebaseapp.com",
  projectId: "proyectoreact-f6b78",
  storageBucket: "proyectoreact-f6b78.appspot.com",
  messagingSenderId: "274584401844",
  appId: "1:274584401844:web:042b68e3d8134ec99164e1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
//

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
