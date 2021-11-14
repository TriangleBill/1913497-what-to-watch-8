import { createSelector } from 'reselect';
import { State } from '../../types/state';
import { getFilms } from '../films-data/selector';
import { NameSpace } from '../root-reducer';

export const getShownFilms = (state: State): number => state[NameSpace.films].shownFilms;
export const getGenre = (state: State): string => state[NameSpace.films].genre;
export const getFilterFilms = createSelector([getFilms, getGenre, getShownFilms], (films, genre, shownFilms)=> {
  if (genre === 'All genres') {
    return films.slice(0, shownFilms);
  }
  return films.filter((el) => el.genre === genre).slice(0, shownFilms);
});
