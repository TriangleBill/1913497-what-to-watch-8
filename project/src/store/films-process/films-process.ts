import { createReducer } from '@reduxjs/toolkit';
import { FilmsProcess } from '../../types/state';
import { changeGenre } from '../action';

const initialState: FilmsProcess = {
  genre: 'All genres',
};


export const filmsProccess = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      const {genre} = action.payload;
      state.genre = genre;
    });
});
