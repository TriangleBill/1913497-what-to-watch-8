import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { configureStore} from '@reduxjs/toolkit';
import { createAPI } from './services/api';
import { checkAuthAction, fetchFilmsAction } from './store/api-actions';
import { ThunkAppDispatch } from './types/action';
import { requireAuthorization } from './store/action';
import { AuthorizationStatus } from './const';
import { rootReducer } from './store/root-reducer';

const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    },
  })
});

store.dispatch(checkAuthAction())
store.dispatch(fetchFilmsAction())



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
