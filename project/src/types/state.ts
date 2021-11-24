import { AuthorizationStatus } from '../const';
import { RootState } from '../store/root-reducer';
import { FilmReviews, FilmsDescription } from './films';

export type FilmsData = {
    filmsList: FilmsDescription[],
    film: FilmsDescription,
    favoriteFilms: FilmsDescription[],
    similarFilms: FilmsDescription[],
    filmReviews: FilmReviews[]
    promoFilm: FilmsDescription,
    isLoadData: boolean,
}

export type FilmsProcess = {
    genre: string,
    shownFilms: number
}

export type UserProcess = {
    authorizationStatus: AuthorizationStatus
}

export type State = RootState
