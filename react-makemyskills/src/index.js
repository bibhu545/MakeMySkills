import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import 'jquery/src/jquery';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import RouterModule from './Utils/RouterModule';
import Nav from './Components/Common/Nav';
import Footer from './Components/Common/Footer';
import { CookiesProvider } from 'react-cookie';
import Preloader from './Utils/Preloader';

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <Preloader></Preloader>
      <Nav />
      <RouterModule />
      <Footer />
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
