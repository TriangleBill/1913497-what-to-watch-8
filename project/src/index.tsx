import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import App from './components/app/app';
import reducer from './store/reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import { createAPI } from './services/api';
import { fetchFilmsAction } from './store/api-actions';
import { ThunkApiDispatch } from './types/action';

const api = createAPI()

const store = createStore(
  reducer, 
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api))
  ));


  (store.dispatch as ThunkApiDispatch)(fetchFilmsAction())    
  

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
