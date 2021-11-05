import { AuthorizationStatus } from '../const';
import { FilmsDescription } from './films';

export type State = {
    genre: string,
    filmsList: FilmsDescription[],
    isLoadData: boolean,
    authorizationStatus: AuthorizationStatus
}
