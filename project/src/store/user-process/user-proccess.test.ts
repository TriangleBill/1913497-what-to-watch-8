import { AuthorizationStatus } from '../../const';
import { userProcess } from './user-proccess';
import { requireAuthorization, requireLogout } from './../action';

describe('Reducer: user', () => {
  it('without additional parameters should return initial state', () => {
    expect(userProcess(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({authorizationStatus: AuthorizationStatus.Unknown});
  });

  it('should update authorizationStatus to "AUTH"', () => {
    const state = {authorizationStatus: AuthorizationStatus.NoAuth};
    expect(userProcess(state, requireAuthorization(AuthorizationStatus.Auth)))
      .toEqual({authorizationStatus: AuthorizationStatus.Auth});
  });

  it('should update authorizationStatus to "NO_AUTH"', () => {
    const state = {authorizationStatus: AuthorizationStatus.NoAuth};
    expect(userProcess(state, requireLogout()))
      .toEqual({authorizationStatus: AuthorizationStatus.NoAuth});
    expect(userProcess(state, requireAuthorization(AuthorizationStatus.NoAuth)))
      .toEqual({authorizationStatus: AuthorizationStatus.NoAuth});
  });
});
