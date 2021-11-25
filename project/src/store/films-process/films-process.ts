import { createReducer } from '@reduxjs/toolkit';
import { FilmsProcess } from '../../types/state';
import { changeGenre, resetShownFilms } from '../action';
import { incrementShownFilms } from './../action';
import { SHOWN_FILMS_COUNT } from './../../const';

const initialState: FilmsProcess = {
  genre: 'All genres',
  shownFilms: SHOWN_FILMS_COUNT,
};


export const filmsProccess = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      const {genre} = action.payload;
      state.genre = genre;
    })
    .addCase(incrementShownFilms, (state, _action) => {
      state.shownFilms += SHOWN_FILMS_COUNT;
    })
    .addCase(resetShownFilms, (state, _action) => {
      state.shownFilms = SHOWN_FILMS_COUNT;
    });
});
