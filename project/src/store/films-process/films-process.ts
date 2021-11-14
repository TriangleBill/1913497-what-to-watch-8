import { createReducer } from '@reduxjs/toolkit';
import { FilmsProcess } from '../../types/state';
import { changeGenre, resetShownFilms } from '../action';
import { incrementShownFilms } from './../action';

const initialState: FilmsProcess = {
  genre: 'All genres',
  shownFilms: 8,
};


export const filmsProccess = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      const {genre} = action.payload;
      state.genre = genre;
    })
    .addCase(incrementShownFilms, (state, _action) => {
      state.shownFilms += 8;
    })
    .addCase(resetShownFilms, (state, _action) => {
      state.shownFilms = 8;
    });
});
