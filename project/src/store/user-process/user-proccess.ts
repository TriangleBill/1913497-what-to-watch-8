import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { UserProcess } from '../../types/state';
import { requireAuthorization, requireLogout } from './../action';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
};


export const userProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      const {authStatus} = action.payload;
      state.authorizationStatus = authStatus;
    })
    .addCase(requireLogout, (state, _action) =>  {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
});
