import { AuthorizationStatus } from '../const';
import { createAPI } from '../services/api';
import { requireAuthorization } from './action';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';

export const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
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
