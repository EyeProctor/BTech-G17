import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'typeface-roboto';
import {createStore, applyMiddleware, compose} from 'redux';
import allReducer from './reducer/index';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';


function saveToLocalStorage(state){
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('iProctorState', serializedState)
  } catch (error) {
    console.log(error);
  }
}

function loadFromLocalStorage(){
  try {
    const serializedState =localStorage.getItem("iProctorState")
    if(serializedState === null) return undefined
    return JSON.parse(serializedState);
  } catch (error) {
    console.log(error)
    return undefined;
  }
}

const persistedState = loadFromLocalStorage();

const store = createStore(allReducer,persistedState,compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

store.subscribe(()=> saveToLocalStorage(store.getState()))
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
