import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AppMobile from "./AppMobile";

const root = ReactDOM.createRoot(document.getElementById('root'));

if ((navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i))) {
  root.render(
    <React.StrictMode>
      <AppMobile />
    </React.StrictMode>
  )
} else {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
