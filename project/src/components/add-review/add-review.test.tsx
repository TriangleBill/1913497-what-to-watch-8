import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import { makeFakeFilmsList, makeFakeReviewsFilm } from './../../store/utils/mocks';
import AddReview from './add-review';
import ReactRouter from 'react-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { AuthorizationStatus } from '../../const';
import { Provider } from 'react-redux';

const mockStore = configureMockStore([thunk]);
const fakeFilms = makeFakeFilmsList();
const fakeReviews = makeFakeReviewsFilm();

const store = mockStore({
  USER: { authorizationStatus: AuthorizationStatus.Auth },
  FILMS: { genre: 'All genre', shownFilms: 8 },
  DATA: {
    filmsList: fakeFilms,
    film: fakeFilms[0],
    favoriteFilms: fakeFilms,
    similarFilms: fakeFilms,
    filmReviews: fakeReviews,
    promoFilm: fakeFilms[0],
    isLoadData: true,
  },
});

describe('Component: AddReview', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: String(fakeFilms[0].id) });

    const { rerender } = render(
      <Provider store={store}>
        <Router history={history}>
          <AddReview films={fakeFilms} />
        </Router>
      </Provider>,
    );

    for (let index = 1; index < 11; index++) {
      expect(screen.getByDisplayValue(index)).toBeInTheDocument();
    }
    expect(screen.getByPlaceholderText('Review text')).toBeInTheDocument();
    expect(screen.getByText('Post')).toBeInTheDocument();

    rerender(
      <Provider store={store}>
        <Router history={history}>
          <AddReview films={makeFakeFilmsList()} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('404 page not found')).toBeInTheDocument();
  });
});
