import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css'; // not writing any custom css so comment
import App from './App'; // This is where we create our starting point for our app
//import reportWebVitals from './reportWebVitals'; // not using this

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);