import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import {createStore, applyMiddleware, compose} from 'redux';
import allReducer from './reducer/index';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';



const store = createStore(allReducer,compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

// window.__REDUX_DEVTOOLS_EXTENSION__? window.__REDUX_DEVTOOLS_EXTENSION__(): f => f

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
