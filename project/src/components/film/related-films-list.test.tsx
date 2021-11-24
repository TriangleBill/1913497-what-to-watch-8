import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import RelatedFilmsList from './related-films-list';
import { makeFakeFilmsList, makeFakeReviewsFilm } from '../../store/utils/mocks';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';


describe('Component: RelatedFilmsList', () => {
  it('should render correctly', () => {
    const mockStore = configureMockStore([thunk]);
    const history = createMemoryHistory();
    const fakeFilms = makeFakeFilmsList();
    const fakeFilmReviews = makeFakeReviewsFilm();
    const store = mockStore({
      DATA: {
        filmsList: fakeFilms,
        film: fakeFilms[0],
        favoriteFilms: fakeFilms.slice(0, 4),
        similarFilms: fakeFilms.slice(0, 4),
        filmReviews: fakeFilmReviews,
        promoFilm:fakeFilms[0],
        isLoadData: false,
      },
    });

    const storeWithoutSimilar = mockStore({
      DATA: {
        filmsList: fakeFilms,
        film: fakeFilms[0],
        favoriteFilms: fakeFilms.slice(0, 4),
        similarFilms: [],
        filmReviews: fakeFilmReviews,
        promoFilm:fakeFilms[0],
        isLoadData: false,
        isServerError: false,
      },
    });

    const { rerender } = render(
      <Provider store={storeWithoutSimilar}>
        <Router history={history}>
          <RelatedFilmsList filmId={1} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Related films not found')).toBeInTheDocument();

    rerender(
      <Provider store={store}>
        <Router history={history}>
          <RelatedFilmsList filmId={1} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(fakeFilms[0].name)).toBeInTheDocument();
    expect(screen.getByText(fakeFilms[1].name)).toBeInTheDocument();
  });
});
