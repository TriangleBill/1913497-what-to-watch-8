import { AuthorizationStatus } from '../const';
import { ActionType, ChangeGenre, ChangeIsLoadData, SetFilms } from '../types/action';
import { FilmsDescription } from '../types/films';

export const changeGenre = (genre: string): ChangeGenre => ({
  type: ActionType.ChangeGenre,
  payload: genre,
});

export const setFilms = (films: FilmsDescription[]): SetFilms => ({
  type: ActionType.SetFilms,
  payload: films,
});

export const changeIsLoadData = (): ChangeIsLoadData => ({
  type: ActionType.ChangeIsLoadData,
});

export const requireAuthorization = (authStatus: AuthorizationStatus) => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
} as const);

export const requireLogout = () => ({
  type: ActionType.RequireLogout,
} as const);
