import { FilmsDescription } from './films';

export type State = {
    genre: string,
    filmsList: FilmsDescription[],
    isLoadData: boolean
}
