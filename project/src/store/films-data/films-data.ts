import { createReducer } from '@reduxjs/toolkit';
import { LoadedDataStatus } from '../../const';
import { FilmsData } from '../../types/state';
import { setFavoriteFilms, setFilm, setFilmReviews, setFilms } from '../action';
import { setPromoFilm, setSimilarFilms, requireLoaded } from './../action';

const initialState: FilmsData = {
  filmsList: [],
  film: [][0],
  favoriteFilms: [],
  similarFilms: [],
  filmReviews: [],
  promoFilm: [][0],
  loadedStatus: LoadedDataStatus.Unknown,
};


export const filmsData = createReducer(initialState, (builder) => {
  builder
    .addCase(setFilms, (state, action) => {
      const { films } = action.payload;
      state.filmsList = films;
      state.loadedStatus = LoadedDataStatus.Loaded;
    })
    .addCase(setFilm, (state, action) => {
      const { film } = action.payload;
      state.film = film;
      state.loadedStatus = LoadedDataStatus.Loaded;
    })
    .addCase(setFavoriteFilms, (state, action) => {
      const { films } = action.payload;
      state.favoriteFilms = films;
      state.loadedStatus = LoadedDataStatus.Loaded;
    })
    .addCase(setPromoFilm, (state, action) => {
      const { film } = action.payload;
      state.promoFilm = film;
      state.loadedStatus = LoadedDataStatus.Loaded;
    })
    .addCase(setFilmReviews, (state, action) => {
      const { reviews } = action.payload;
      state.filmReviews = reviews;
      state.loadedStatus = LoadedDataStatus.Loaded;
    })
    .addCase(setSimilarFilms, (state, action) => {
      const { films } = action.payload;
      state.similarFilms = films;
      state.loadedStatus = LoadedDataStatus.Loaded;
    })
    .addCase(requireLoaded, (state, action) => {
      const { loadedStatus } = action.payload;
      state.loadedStatus = loadedStatus;
    });
});
