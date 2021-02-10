import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'typeface-roboto';
import {createStore} from 'redux';
import allReducer from './reducer/index';
import {Provider} from 'react-redux';
import QuizLandingPage from './components/quiz/QuizLandingPage';
import TempLanding from './components/quiz/TempLanding'


const store = createStore(allReducer);

ReactDOM.render(
  <Provider store={store}>
    <TempLanding/>
  </Provider>,
  document.getElementById('root')
);
