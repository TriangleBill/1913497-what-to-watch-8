import { FilmReviews, FilmsDescription } from '../../types/films';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

export const getFilms = (state: State): FilmsDescription[] => state[NameSpace.data].filmsList;
export const getFilm = (state: State): FilmsDescription => state[NameSpace.data].film;
export const getFavoriteFilms = (state: State): FilmsDescription[] => state[NameSpace.data].favoriteFilms;
export const getSimilarFilms = (state: State): FilmsDescription[] => state[NameSpace.data].similarFilms;
export const getPromoFilm = (state: State): FilmsDescription => state[NameSpace.data].promoFilm;
export const getFilmReviews = (state: State): FilmReviews[] | null => state[NameSpace.data].filmReviews;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.data].isLoadData;
export const getServerErrorStatus = (state: State): boolean => state[NameSpace.data].isServerError;
