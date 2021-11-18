import { FilmsDescription } from '../../types/films';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

export const getFilms = (state: State): FilmsDescription[] => state[NameSpace.data].filmsList;
export const getFavoriteFilms = (state: State): FilmsDescription[] => state[NameSpace.data].favoriteFilms;
export const getPromoFilm = (state: State): FilmsDescription => state[NameSpace.data].promoFilm;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.data].isLoadData;
