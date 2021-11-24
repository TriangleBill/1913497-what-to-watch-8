
import { createAPI } from './../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import { Action } from 'redux';
import { checkAuthAction, fetchFavoriteFilmsAction, fetchFilmAction, fetchFilmsAction, fetchPromoFilmAction, fetchReviewsAction, fetchSimilarFilmsAction, loginAction, logoutAction, postReviewAction } from './api-actions';
import { requireAuthorization, requireLogout, setFavoriteFilms, setFilm, setFilms, setPromoFilm, setSimilarFilms, setFilmReviews } from './action';
import { AuthorizationStatus } from '../const';
import { makeFakeAuthData, makeFakeFilmsList, makeFakeReviewsFilm } from './utils/mocks';

describe('Async actions', () => {
  const onFakeUnauthorized = jest.fn();
  const onFakeUnfound = jest.fn();
  const api = createAPI(
    onFakeUnauthorized(),
    onFakeUnfound(),
  );
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

  it('should dispatch setFilm when GET /films/:id', async () => {
    const mockFilm = makeFakeFilmsList()[0];
    const fakeFilmId = mockFilm.id;
    mockAPI
      .onGet(`/films/${fakeFilmId}`)
      .reply(200, mockFilm);

    const store = mockStore();
    await store.dispatch(fetchFilmAction(fakeFilmId));

    expect(store.getActions()).toEqual([
      setFilm(mockFilm),
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

  it('should dispatch setSimilarFilms when GET /films/:id/similar', async () => {
    const mockFilmId = makeFakeFilmsList()[0].id;
    const mockSimilarFilms = makeFakeFilmsList();
    mockAPI
      .onGet(`/films/${mockFilmId}/similar`)
      .reply(200, mockSimilarFilms);

    const store = mockStore();
    await store.dispatch(fetchSimilarFilmsAction(mockFilmId));

    expect(store.getActions()).toEqual([
      setSimilarFilms(mockSimilarFilms),
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

  it('should dispatch setFilmReviews when GET /comments/:id', async () => {
    const mockFilmId = makeFakeFilmsList()[0].id;
    const mockReviews = makeFakeReviewsFilm();
    mockAPI
      .onGet(`/comments/${mockFilmId}`)
      .reply(200, mockReviews);

    const store = mockStore();
    await store.dispatch(fetchReviewsAction(mockFilmId));

    expect(store.getActions()).toEqual([
      setFilmReviews(mockReviews),
    ]);
  });

  it('should dispatch setFilmReviews when POST /comments/:id', async () => {
    const mockFilmId = makeFakeFilmsList()[0].id;
    const mockReviews = makeFakeReviewsFilm();
    const mockSentReview = makeFakeReviewsFilm()[0];
    mockAPI
      .onPost(`/comments/${mockFilmId}`, mockSentReview)
      .reply(200, mockReviews);

    const store = mockStore();
    await store.dispatch(postReviewAction(mockFilmId, mockSentReview));

    expect(store.getActions()).toEqual([
      setFilmReviews(mockReviews),
    ]);
  });
});


