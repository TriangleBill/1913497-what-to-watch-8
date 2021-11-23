import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import { ActionType } from '../types/action';
import { FilmReviews, FilmsDescription } from '../types/films';


export const setFilms = createAction(
  ActionType.SetFilms,
  (films: FilmsDescription[]) => ({
    payload: {
      films,
    },
  }),
);
export const setFilm = createAction(
  ActionType.SetFilm,
  (film: FilmsDescription) => ({
    payload: {
      film,
    },
  }),
);
export const setFavoriteFilms = createAction(
  ActionType.SetFavoriteFilms,
  (films: FilmsDescription[]) => ({
    payload: {
      films,
    },
  }),
);
export const setPromoFilm = createAction(
  ActionType.SetPromoFilm,
  (film: FilmsDescription) => ({
    payload: {
      film,
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
export const setFilmReviews = createAction(
  ActionType.SetFilmReviews,
  (reviews: FilmReviews[]) => ({
    payload: {
      reviews,
    },
  }),
);
export const setSimilarFilms = createAction(
  ActionType.SetSimilarFilms,
  (films: FilmsDescription[]) => ({
    payload: {
      films,
    },
  }),
);
export const requireLogout = createAction(ActionType.RequireLogout);
export const requireServerError = createAction(ActionType.RequireServerError);
export const incrementShownFilms = createAction(ActionType.incrementShownFilms);
export const resetShownFilms = createAction(ActionType.resetShownFilms);

