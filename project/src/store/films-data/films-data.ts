import { createReducer } from '@reduxjs/toolkit';
import { FilmsData } from '../../types/state';
import { setFavoriteFilms, setFilms } from '../action';
import { setPromoFilm } from './../action';
import { makeFakeFilmsList } from './../utils/mocks';

const initialState: FilmsData = {
  filmsList: [],
  favoriteFilms: [],
  promoFilm: makeFakeFilmsList()[0],
  isLoadData: true,
};


export const filmsData = createReducer(initialState, (builder) => {
  builder
    .addCase(setFilms, (state, action) => {
      const { films } = action.payload;
      state.filmsList = films;
      state.isLoadData = false;
    })
    .addCase(setFavoriteFilms, (state, action) => {
      const { films } = action.payload;
      state.favoriteFilms = films;
      state.isLoadData = false;
    })
    .addCase(setPromoFilm, (state, action) => {
      const { film } = action.payload;
      state.promoFilm = film;
      state.isLoadData = false;
    });
});
