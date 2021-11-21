
import { makeFakeFilmsList } from '../utils/mocks';
import { setFavoriteFilms, setFilms, setPromoFilm } from './../action';
import { filmsData, mosckPromoFilm } from './films-data';

const mockFilmsList = makeFakeFilmsList();
const mockPromoFilms = mosckPromoFilm;
const mockFavoriteFilms = makeFakeFilmsList();

describe('Reducer: filmsData', () => {
  it('without additional parameters should return initial state', () => {
    expect(filmsData(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        filmsList: [],
        favoriteFilms: [],
        isLoadData: true,
        promoFilm: mockPromoFilms,
      });
  });
  it('should update films by load films', () => {
    const state = {
      filmsList: [],
      favoriteFilms: [],
      isLoadData: true,
      promoFilm: mockPromoFilms,
    };

    expect(filmsData(state, setFilms(mockFilmsList)))
      .toEqual({
        filmsList: mockFilmsList,
        isLoadData: false ,
        favoriteFilms: [],
        promoFilm: mockPromoFilms,
      });
  });
  it('should update favorite films by load  favorite films', () => {
    const state = {
      filmsList: [],
      favoriteFilms: [],
      isLoadData: true,
      promoFilm: mockPromoFilms,
    };

    expect(filmsData(state, setFavoriteFilms(mockFavoriteFilms)))
      .toEqual({
        favoriteFilms: mockFavoriteFilms,
        isLoadData: false,
        filmsList: [],
        promoFilm: mockPromoFilms,
      });
  });
  it('should update promo film by load  promo film', () => {
    const state = {
      filmsList: [],
      favoriteFilms: [],
      isLoadData: true,
      promoFilm: mockFilmsList[0],
    };

    expect(filmsData(state, setPromoFilm(mockPromoFilms)))
      .toEqual({
        promoFilm: mockPromoFilms,
        isLoadData: false,
        filmsList: [],
        favoriteFilms: [],
      });
  });
});
