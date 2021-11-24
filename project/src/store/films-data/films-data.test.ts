
import { makeFakeFilmsList } from '../utils/mocks';
import { setFavoriteFilms, setFilm, setFilms, setPromoFilm, setFilmReviews, setSimilarFilms } from './../action';
import { filmsData } from './films-data';
import { makeFakeReviewsFilm } from './../utils/mocks';

const mockFilmsList = makeFakeFilmsList();
const mockPromoFilm = mockFilmsList[0];
const mockFavoriteFilms = makeFakeFilmsList();
const mockReviews = makeFakeReviewsFilm();

describe('Reducer: filmsData', () => {
  it('without additional parameters should return initial state', () => {
    expect(filmsData(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        filmsList: [],
        film: [][0],
        favoriteFilms: [],
        similarFilms: [],
        filmReviews: [],
        promoFilm: [][0],
        isLoadData: true,
      });
  });
  it('should update films by load films', () => {
    const state = {
      filmsList: [],
      film: [][0],
      favoriteFilms: [],
      similarFilms: [],
      filmReviews: [],
      promoFilm: [][0],
      isLoadData: true,
    };

    expect(filmsData(state, setFilms(mockFilmsList)))
      .toEqual({
        filmsList: mockFilmsList,
        film: [][0],
        favoriteFilms: [],
        similarFilms: [],
        filmReviews: [],
        promoFilm: [][0],
        isLoadData: false,
      });
  });

  it('should update film by load film', () => {
    const state = {
      filmsList: [],
      film: [][0],
      favoriteFilms: [],
      similarFilms: [],
      filmReviews: [],
      promoFilm: [][0],
      isLoadData: true,
    };

    expect(filmsData(state, setFilm(mockFilmsList[0])))
      .toEqual({
        filmsList: [],
        film: mockFilmsList[0],
        favoriteFilms: [],
        similarFilms: [],
        filmReviews: [],
        promoFilm: [][0],
        isLoadData: false,
      });
  });
  it('should update favorite films by load  favorite films', () => {
    const state = {
      filmsList: [],
      film: [][0],
      favoriteFilms: [],
      similarFilms: [],
      filmReviews: [],
      promoFilm: [][0],
      isLoadData: true,

    };

    expect(filmsData(state, setFavoriteFilms(mockFavoriteFilms)))
      .toEqual({
        filmsList: [],
        film: [][0],
        favoriteFilms: mockFavoriteFilms,
        similarFilms: [],
        filmReviews: [],
        promoFilm: [][0],
        isLoadData: false,
      });
  });
  it('should update promo film by load  promo film', () => {
    const state = {
      filmsList: [],
      film: [][0],
      favoriteFilms: [],
      similarFilms: [],
      filmReviews: [],
      promoFilm: [][0],
      isLoadData: true,
    };

    expect(filmsData(state, setPromoFilm(mockPromoFilm)))
      .toEqual({
        filmsList: [],
        film: [][0],
        favoriteFilms: [],
        similarFilms: [],
        filmReviews: [],
        promoFilm: mockPromoFilm,
        isLoadData: false,
      });
  });

  it('should update reviews by load  reviews', () => {
    const state = {
      filmsList: [],
      film: [][0],
      favoriteFilms: [],
      similarFilms: [],
      filmReviews: [],
      promoFilm: [][0],
      isLoadData: true,
    };

    expect(filmsData(state, setFilmReviews(mockReviews)))
      .toEqual({
        filmsList: [],
        film: [][0],
        favoriteFilms: [],
        similarFilms: [],
        filmReviews: mockReviews,
        promoFilm: [][0],
        isLoadData: false,
      });
  });

  it('should update similar film by load  similar film', () => {
    const state = {
      filmsList: [],
      film: [][0],
      favoriteFilms: [],
      similarFilms: [],
      filmReviews: [],
      promoFilm: [][0],
      isLoadData: true,
    };

    expect(filmsData(state, setSimilarFilms(mockFilmsList)))
      .toEqual({
        filmsList: [],
        film: [][0],
        favoriteFilms: [],
        similarFilms: mockFilmsList,
        filmReviews: [],
        promoFilm: [][0],
        isLoadData: false,
      });
  });
});
