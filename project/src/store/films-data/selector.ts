import { FilmsDescription } from '../../types/films';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

export const getFilms = (state: State): FilmsDescription[] => state[NameSpace.data].filmsList;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.data].isLoadData;
