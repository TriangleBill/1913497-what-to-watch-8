import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import App from './components/app/app';
import reducer from './store/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { createAPI } from './services/api';
import { checkAuthAction, fetchFilmsAction } from './store/api-actions';
import { ThunkAppDispatch } from './types/action';
import { requireAuthorization } from './store/action';
import { AuthorizationStatus } from './const';

const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
);

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
  ));
(store.dispatch as ThunkAppDispatch)(checkAuthAction());

(store.dispatch as ThunkAppDispatch)(fetchFilmsAction());


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
