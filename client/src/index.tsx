// Required Imports
import React from 'react';
import ReactDOM from 'react-dom/client'; 

// File Imports
import './static/css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Accessing the root element
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Rendering the application
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();