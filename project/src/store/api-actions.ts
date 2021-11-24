import { AuthorizationStatus } from '../const';
import snakeToCamel from '../snake-to-camel';
import { ThunkActionResult } from '../types/action';
import { requireAuthorization, setFilms, requireLogout, setFavoriteFilms, setPromoFilm, setFilmReviews, setSimilarFilms, setFilm } from './action';
import { AuthData } from '../types/auth-data';
import { dropToken, saveToken, Token } from '../services/token';
import { FilmsDescription } from '../types/films';
import _ from 'lodash';
import { ReviewData } from '../types/reviewData';

export const fetchFilmsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get('/films');
    const camelData = snakeToCamel(data);
    dispatch(setFilms(camelData));
  };

export const fetchFilmAction = (filmId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    await api.get(`/films/${filmId}`)
      .then((response) => {
        const camelData = _.mapKeys(response.data, (_value, key: string) => _.camelCase(key)) as FilmsDescription;
        dispatch(setFilm(camelData));
      });
  };


export const fetchFavoriteFilmsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get('/favorite');
    const camelData = snakeToCamel(data);
    dispatch(setFavoriteFilms(camelData));
  };

export const fetchSimilarFilmsAction = (FilmId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get(`/films/${FilmId}/similar`);
    const camelData = snakeToCamel(data);
    dispatch(setSimilarFilms(camelData));
  };

export const fetchPromoFilmAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get('/promo');
    const camelData = _.mapKeys(data, (_value, key: string) => _.camelCase(key)) as FilmsDescription;
    dispatch(setPromoFilm(camelData));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get('/login');
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  };

export const loginAction = ({ login: email, password }: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.post<{ token: Token }>('/login', { email, password })
      .then((res) => {
        saveToken(res.data.token);
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
      });
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.delete('/logout')
      .then(() => {
        dropToken();
        dispatch(requireLogout());
      });
  };

export const postReviewAction = (FilmId: number, reviewData: ReviewData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.post(`/comments/${FilmId}`, reviewData)
      .then((resp) => {
        dispatch(setFilmReviews(resp.data));
      });
  };

export const fetchReviewsAction = (FilmId: number): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(`/comments/${FilmId}`)
      .then((resp) => {
        dispatch(setFilmReviews(resp.data));
      });
  };
