import React from 'react';
import ReactDOM from 'react-dom';
import moment from "moment";

import { Provider } from 'react-redux';
import store from './redux/store';

import 'font-awesome/css/font-awesome.min.css';

import './styles/index.scss';
import App from './App';

moment.locale('ch');

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
