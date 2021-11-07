import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

export const getGenre = (state: State): string => state[NameSpace.films].genre;
