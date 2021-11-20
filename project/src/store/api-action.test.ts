
import { createAPI } from './../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import { Action } from 'redux';
import { checkAuthAction, fetchFavoriteFilmsAction, fetchFilmsAction, fetchPromoFilmAction, loginAction, logoutAction } from './api-actions';
import { requireAuthorization, requireLogout, setFavoriteFilms, setFilms, setPromoFilm } from './action';
import { AuthorizationStatus } from '../const';
import { makeFakeAuthData, makeFakeFilmsList } from './utils/mocks';

describe('Async actions', () => {
  const onFakeUnauthorized = jest.fn();
  const api = createAPI(onFakeUnauthorized());
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
        State,
        Action,
        ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should authorization status is "auth" when sever return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet('/login')
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    expect(store.getActions()).toEqual([
      requireAuthorization(AuthorizationStatus.Auth),
    ]);
  });

  it('should dispatch setFilms when GET /films', async () => {
    const mockFilms = makeFakeFilmsList();
    mockAPI
      .onGet('/films')
      .reply(200, mockFilms);

    const store = mockStore();
    await store.dispatch(fetchFilmsAction());

    expect(store.getActions()).toEqual([
      setFilms(mockFilms),
    ]);
  });

  it('should dispatch setFavoriteFilms when GET /favorite', async () => {
    const mockFilms = makeFakeFilmsList();
    mockAPI
      .onGet('/favorite')
      .reply(200, mockFilms);

    const store = mockStore();
    await store.dispatch(fetchFavoriteFilmsAction());

    expect(store.getActions()).toEqual([
      setFavoriteFilms(mockFilms),
    ]);
  });

  it('should dispatch setPromoFilm when GET /promo', async () => {
    const mockFilms = makeFakeFilmsList();
    mockAPI
      .onGet('/promo')
      .reply(200, mockFilms[0]);

    const store = mockStore();
    await store.dispatch(fetchPromoFilmAction());

    expect(store.getActions()).toEqual([
      setPromoFilm(mockFilms[0]),
    ]);
  });

  it('should dispatch requireAuthorization when user authorize', async () => {
    const mockAuthData = makeFakeAuthData();
    mockAPI
      .onPost('/login')
      .reply(200, {token: 'secret'});

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(mockAuthData));

    expect(store.getActions()).toEqual([
      requireAuthorization(AuthorizationStatus.Auth),
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('wtw-token', 'secret');
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete('/logout')
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    expect(store.getActions()).toEqual([requireLogout()]);
    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('wtw-token');
  });
});
