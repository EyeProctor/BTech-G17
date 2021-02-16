import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import {createStore} from 'redux';
import allReducer from './reducer/index';
import {Provider} from 'react-redux';
import App from './App';



const store = createStore(allReducer);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
