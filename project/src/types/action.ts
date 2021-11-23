import { AxiosInstance } from 'axios';
import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { State } from './state';

export enum ActionType {
    ChangeGenre = 'film/changeGenre',
    incrementShownFilms = 'film/incrementShownFilms',
    resetShownFilms = 'film/resetShownFilms',
    SetFilms = 'film/setFilms',
    SetFilm = 'film/setFilm',
    SetFavoriteFilms= 'film/setFavoriteFilms',
    SetPromoFilm='film/setPromoFilm',
    SetCardElements = 'film/setCardElement',
    SetFilmReviews = 'film/setFilmReviews',
    SetSimilarFilms = 'film/setSimilarFilms',
    ChangeIsLoadData = 'data/changeIsLoadData',
    RequireServerError = 'data/requireServerError',
    RequireAuthorization = 'user/requireAuthorization',
    RequireLogout = 'user/requireLogout',
}


export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>
