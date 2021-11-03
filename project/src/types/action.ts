import { AxiosInstance } from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { FilmsDescription } from './films';
import { State } from './state';

export enum ActionType {
    ChangeGenre = 'film/changeGenre',
    SetFilms = 'film/setFilms',
    ChangeIsLoadData = 'data/changeIsLoadData'
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

export type Actions = ChangeGenre | SetFilms | ChangeIsLoadData
export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>

export type ThunkApiDispatch = ThunkDispatch<State, AxiosInstance, Actions>
