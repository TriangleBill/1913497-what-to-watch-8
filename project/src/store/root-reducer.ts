import { combineReducers } from 'redux';
import { filmsData } from './films-data/films-data';
import { filmsProccess } from './films-process/films-process';
import { userProcess } from './user-process/user-proccess';

export enum NameSpace {
    Data = 'DATA',
    Films = 'FILMS',
    User = 'USER'
}

export const rootReducer = combineReducers({
  [NameSpace.Data]: filmsData,
  [NameSpace.Films]: filmsProccess,
  [NameSpace.User]: userProcess,
});

export type RootState = ReturnType<typeof rootReducer>
