import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import {createStore} from 'redux';
import allReducer from './reducer/index';
import {Provider} from 'react-redux';
import TempLanding from './components/quiz/TempLanding'


const store = createStore(allReducer);

ReactDOM.render(
  <Provider store={store}>
    <TempLanding/>
  </Provider>,
  document.getElementById('root')
);
