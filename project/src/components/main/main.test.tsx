import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import { makeFakeFilmsList, makeFakeReviewsFilm } from './../../store/utils/mocks';
import Main from './main';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '../../const';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);
const fakeFilms = makeFakeFilmsList();
const fakeReview = makeFakeReviewsFilm();

describe('Component: Main', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: { authorizationStatus: AuthorizationStatus.NoAuth },
      FILMS: { genre: 'All genre', shownFilms: 8 },
      DATA: {
        filmsList: fakeFilms,
        film: fakeFilms[0],
        favoriteFilms: fakeFilms,
        similarFilms: fakeFilms,
        filmReviews: fakeReview,
        promoFilm: fakeFilms[0],
        isLoadData: true,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Main />
        </Router>
      </Provider>,
    );

    setTimeout(() => {
      expect(screen.getByText(fakeFilms[0].name)).toBeInTheDocument();
      expect(screen.getByText(fakeFilms[0].genre)).toBeInTheDocument();
      expect(screen.getByText(fakeFilms[0].released)).toBeInTheDocument();
      expect(screen.getByText('Play')).toBeInTheDocument();
      expect(screen.getByText('My list')).toBeInTheDocument();
      expect(screen.getByAltText(fakeFilms[0].name)).toBeInTheDocument();
      expect(screen.getByText('All genres')).toBeInTheDocument();
    }, 5000);
  });
});
