import React from 'react';
import ReactDOM from 'react-dom';
import moment from "moment";

import './styles/index.scss';
import App from './App';

moment.locale('ch');

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
