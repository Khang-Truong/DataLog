import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AppMobile from "./AppMobile";
import {
  HashRouter as Router
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

if ((navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i))) {
  root.render(
    <Router>
      <AppMobile />
    </Router>
  )
} else {
  root.render(
    <Router>
      <App />
    </Router>
  );
}
