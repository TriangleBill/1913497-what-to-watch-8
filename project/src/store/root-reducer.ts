import { combineReducers } from "redux";
import { filmsData } from './films-data/films-data';
import { filmsProccess } from './films-process/films-process';
import { userProcess } from './user-process/user-proccess';

export enum NameSpace {
    data = 'DATA',
    films = 'FILMS',
    user = 'USER'
}

export const rootReducer = combineReducers({
    [NameSpace.data]: filmsData,
    [NameSpace.films]: filmsProccess,
    [NameSpace.user]: userProcess,
})

export type RootState = ReturnType<typeof rootReducer>