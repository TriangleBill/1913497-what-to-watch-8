import { AuthorizationStatus } from '../const';
import { RootState } from '../store/root-reducer';
import { FilmsDescription } from './films';

export type FilmsData = {
    filmsList: FilmsDescription[],
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
