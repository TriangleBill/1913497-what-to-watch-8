import { AxiosInstance } from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AuthorizationStatus } from '../const';
import { FilmsDescription } from './films';
import { State } from './state';

export enum ActionType {
    ChangeGenre = 'film/changeGenre',
    SetFilms = 'film/setFilms',
    ChangeIsLoadData = 'data/changeIsLoadData',
    RequireAuthorization = 'user/requireAuthorization',
    RequireLogout = 'user/requireLogout'
}

export type ChangeGenre = {
    type: ActionType.ChangeGenre;
    payload: string
}

export type SetFilms = {
    type: ActionType.SetFilms;
    payload: FilmsDescription[]
}

export type ChangeIsLoadData = {
    type: ActionType.ChangeIsLoadData,
}

export type RequireAuthorization = {
    type: ActionType.RequireAuthorization,
    payload: AuthorizationStatus
}

export type RequireLogout = {
    type: ActionType.RequireLogout
}

export type Actions =
| ChangeGenre
| SetFilms
| ChangeIsLoadData
| RequireAuthorization
| RequireLogout

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>
