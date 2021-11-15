
import { changeGenre, resetShownFilms } from '../action';
import { filmsProccess } from './films-process';
import { incrementShownFilms } from './../action';

describe('Reducer: filmsProccess', () => {
  it('without additional parameters should return initial state', () => {
    expect(filmsProccess(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({genre: 'All genres', shownFilms: 8});
  });

  it('should change genre to user selected', () => {
    const state = {genre: 'All genres', shownFilms: 8};
    const fakeGenre = 'Mystic';
    expect(filmsProccess(state, changeGenre(fakeGenre)))
      .toEqual({genre: fakeGenre, shownFilms: 8});
  });

  it('should change shownFilms when user press button', () => {
    const state = {genre: 'All genres', shownFilms: 8};
    expect(filmsProccess(state, incrementShownFilms()))
      .toEqual({genre: 'All genres', shownFilms: 16});
  });

  it('should reset shownFilms when user select genre or restart page', () => {
    const state = {genre: 'All genres', shownFilms: 8};
    expect(filmsProccess(state, resetShownFilms()))
      .toEqual({genre: 'All genres', shownFilms: 8});
  });
});
