import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import NotSupported from "./pages/not-supported";

const root = ReactDOM.createRoot(document.getElementById('root'));

if ((navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i))) {
  root.render(
    <React.StrictMode>
      <NotSupported />
    </React.StrictMode>
  )
} else {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
