import { AuthorizationStatus } from '../const';
import { RootState } from '../store/root-reducer';
import { FilmsDescription } from './films';

// export type State = {
//     genre: string,
//     filmsList: FilmsDescription[],
//     isLoadData: boolean,
//     authorizationStatus: AuthorizationStatus
// }

export type FilmsData = {
    filmsList: FilmsDescription[],
    isLoadData: boolean
}

export type FilmsProcess = {
    genre: string,
}

export type UserProcess = {
    authorizationStatus: AuthorizationStatus
}

export type State = RootState
