
import { changeGenre } from '../action';
import { filmsProccess } from './films-process';

describe('Reducer: filmsProccess', () => {
    it('without additional parameters should return initial state', () => {
        expect(filmsProccess(void 0, {type: 'UNKNOWN_ACTION'}))
        .toEqual({genre: 'All genres'})
    });

    it('should change genre to user selected', () => {
        const state = {genre: 'All genres'}
        const fakeGenre = 'Mystic'
        expect(filmsProccess(state, changeGenre(fakeGenre)))
        .toEqual({genre: fakeGenre})
    })
})