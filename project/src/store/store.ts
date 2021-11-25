import { AuthorizationStatus, LoadedDataStatus } from '../const';
import { createAPI } from '../services/api';
import { requireAuthorization, requireLoaded } from './action';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import { toast } from 'react-toastify';

const AUTHORIZATION_ERROR_MASSAGE = 'The account was not found.';
const SERVER_ERROR_MASSAGE = 'Failed to get data from the server. Please try again later.';

export const api = createAPI(
  () => {
    store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    toast.warning(AUTHORIZATION_ERROR_MASSAGE);
  },
  () => {
    store.dispatch(requireLoaded(LoadedDataStatus.NoLoaded));
    toast.error(SERVER_ERROR_MASSAGE);
  },
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
