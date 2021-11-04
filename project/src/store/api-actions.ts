import { AuthorizationStatus } from '../const';
import snakeToCamel from '../snake-to-camel';
import { ThunkActionResult } from '../types/action';
import { changeIsLoadData, requireAuthorization, setFilms, requireLogout } from './action';
import { AuthData } from '../types/auth-data';
import { dropToken, saveToken, Token } from '../services/token';

export const fetchFilmsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get('/films');

    const camelData = snakeToCamel(data);
    dispatch(setFilms(camelData));
    dispatch(changeIsLoadData());
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
