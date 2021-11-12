
import { makeFakeFilmsList } from '../utils/mocks';
import { setFilms } from './../action';
import { filmsData } from './films-data';

const mockFilmsList = makeFakeFilmsList()

describe('Reducer: filmsData', () => {
    it('without additional parameters should return initial state', () => {
        expect(filmsData(void 0, { type: 'UNKNOWN_ACTION' }))
            .toEqual({ filmsList: [], isLoadData: true });
    });
    it('should update films by load films', () => {
        const state = { filmsList: [], isLoadData: true }
        expect(filmsData(state, setFilms(mockFilmsList)))
            .toEqual({ filmsList: mockFilmsList, isLoadData: false })
    })
})