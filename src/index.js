// import './img/TribeLogo.png'; // Example test for our file-loader module in webpack.common
// import './styles/base.css';
import './styles/index.scss';
// import './styles/reset.css'; //Delete this or normalize css
// import './styles/normalize.css';

//React based imports below
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AppProvider } from './context';
ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
