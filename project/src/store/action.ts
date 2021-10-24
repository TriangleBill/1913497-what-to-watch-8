import { ActionType, ChangeGenre, GetFilms } from "../types/action";
import { FilmsDescription } from "../types/films";

export const changeGenre = (genre: string): ChangeGenre => ({
    type: ActionType.ChangeGenre,
    payload: genre
})

export const getFilms = (films: FilmsDescription[]): GetFilms => ({
    type: ActionType.GetFilms,
    payload: films
})