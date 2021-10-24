import { FilmsDescription } from "./films"

export enum ActionType {
    ChangeGenre = 'film/changeGenre',
    GetFilms = 'film/getFilms'
}

export type ChangeGenre = {
    type: ActionType.ChangeGenre;
    payload: string
}

export type GetFilms = {
    type: ActionType.GetFilms;
    payload: FilmsDescription[]
}

export type Actions = ChangeGenre | GetFilms