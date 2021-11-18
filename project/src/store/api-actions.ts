import { AuthorizationStatus } from '../const';
import snakeToCamel from '../snake-to-camel';
import { ThunkActionResult } from '../types/action';
import { requireAuthorization, setFilms, requireLogout, setFavoriteFilms, setPromoFilm } from './action';
import { AuthData } from '../types/auth-data';
import { dropToken, saveToken, Token } from '../services/token';
import { FilmsDescription } from '../types/films';
import _ from 'lodash';

export const fetchFilmsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get('/films');
    const camelData = snakeToCamel(data);
    dispatch(setFilms(camelData));
  };

export const fetchFavoriteFilmsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get('/favorite');
    const camelData = snakeToCamel(data);
    dispatch(setFavoriteFilms(camelData));
  };

export const fetchPromoFilmAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get('/promo');
    const camelData = _.mapKeys(data, (_value, key:string) => _.camelCase(key)) as FilmsDescription;
    dispatch(setPromoFilm(camelData));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get('/login');
    dispatch(requireAuthorization(AuthorizationStatus.Auth));

  };

export const loginAction = ({ login: email, password }: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data: { token } } = await api.post<{ token: Token }>('/login', { email, password });
    saveToken(token);

    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete('/logout');
    dropToken();
    dispatch(requireLogout());
  };
