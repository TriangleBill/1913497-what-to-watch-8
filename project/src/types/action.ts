import { FilmsDescription } from './films';

export enum ActionType {
    ChangeGenre = 'film/changeGenre',
    SetFilms = 'film/getFilms'
}

export type ChangeGenre = {
    type: ActionType.ChangeGenre;
    payload: string
}

export type SetFilms = {
    type: ActionType.SetFilms;
    payload: FilmsDescription[]
}

export type Actions = ChangeGenre | SetFilms
