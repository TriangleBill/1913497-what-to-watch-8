import { ActionType, ChangeGenre, SetFilms } from '../types/action';
import { FilmsDescription } from '../types/films';

export const changeGenre = (genre: string): ChangeGenre => ({
  type: ActionType.ChangeGenre,
  payload: genre,
});

export const setFilms = (films: FilmsDescription[]): SetFilms => ({
  type: ActionType.SetFilms,
  payload: films,
});
