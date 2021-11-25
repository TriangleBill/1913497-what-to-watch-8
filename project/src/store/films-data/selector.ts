import { LoadedDataStatus } from '../../const';
import { FilmReviews, FilmsDescription } from '../../types/films';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

export const getFilms = (state: State): FilmsDescription[] => state[NameSpace.Data].filmsList;
export const getFilm = (state: State): FilmsDescription => state[NameSpace.Data].film;
export const getFavoriteFilms = (state: State): FilmsDescription[] => state[NameSpace.Data].favoriteFilms;
export const getSimilarFilms = (state: State): FilmsDescription[] => state[NameSpace.Data].similarFilms;
export const getPromoFilm = (state: State): FilmsDescription => state[NameSpace.Data].promoFilm;
export const getFilmReviews = (state: State): FilmReviews[] | null => state[NameSpace.Data].filmReviews;
export const getLoadedDataStatus = (state: State): LoadedDataStatus => state[NameSpace.Data].loadedStatus;
