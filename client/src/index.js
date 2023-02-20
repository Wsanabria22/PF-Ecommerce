import React from 'react';
import ReactDOM from 'react-dom';
//import ReactDOM from 'react-dom/client';  para react-dom ver 18 o superior
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { Auth0Provider } from "@auth0/auth0-react";
import {store} from './redux/store';
import axios from "axios";

// Configuracion Auth0

console.log('variables de entorno',
  process.env.REACT_APP_AUTH0_DOMAIN,
  process.env.REACT_APP_AUTH0_CLIENT_ID,
  process.env.BASE_URL_API,
  process.env.BASE_URL_APP
)
// REACT_APP_AUTH0_DOMAIN=dev-5h1bog45hog5t2oc.us.auth0.com
// REACT_APP_AUTH0_CLIENT_ID=51MjhyIb5bsjWBFdgVk3S0D7BEhFladQ
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientID = process.env.REACT_APP_AUTH0_CLIENT_ID;
const baseUrlApp = process.env.BASE_URL_APP || 'http://localhost:3000';
// const baseUrlApp = 'https://pf-ecommerce-peach.vercel.app';
const postLogin = baseUrlApp + '/postlogin';

axios.defaults.baseURL = process.env.BASE_URL_API || 'http://localhost:3001'
// axios.defaults.baseURL = 'https://pf-ecommerce-production-aca7.up.railway.app'

// con react-dom v18 y superior
//const root = ReactDOM.createRoot(document.getElementById('root')); 
//root.render(
  ReactDOM.render(  // esta va con react v17, con v18 va lo de arriba
 <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Auth0Provider domain={domain} clientId={clientID} redirectUri={ postLogin } >
          <App />
        </Auth0Provider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root') // esta linea va si se usa react-dom ver 17, con la 18 no va
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
