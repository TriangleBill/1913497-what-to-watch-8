import { AuthorizationStatus } from '../const';
import { createAPI } from '../services/api';
import { requireAuthorization, requireServerError } from './action';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import { toast } from 'react-toastify';

export const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
  () => toast.error('Failed to get data from the server. Please try again later.'),
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export default store;
