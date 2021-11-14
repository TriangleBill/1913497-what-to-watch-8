import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import { ActionType} from '../types/action';
import { FilmsDescription } from '../types/films';


export const setFilms = createAction(
  ActionType.SetFilms,
  (films: FilmsDescription[]) => ({
    payload: {
      films,
    },
  }),
);
export const changeGenre = createAction(
  ActionType.ChangeGenre,
  (genre: string) => ({
    payload: {
      genre,
    },
  }),
);
export const requireAuthorization = createAction(
  ActionType.RequireAuthorization,
  (authStatus: AuthorizationStatus) => ({
    payload: {
      authStatus,
    },
  }),
);
export const requireLogout = createAction(ActionType.RequireLogout);
export const incrementShownFilms = createAction(ActionType.incrementShownFilms);
export const resetShownFilms = createAction(ActionType.resetShownFilms);
