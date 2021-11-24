import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import { makeFakeFilmsList } from '../../store/utils/mocks';
import Tabs from './tabs';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { makeFakeReviewsFilm } from './../../store/utils/mocks';

describe('Component: Tabs', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const fakeFilm = makeFakeFilmsList()[0];
    const fakeReviews = makeFakeReviewsFilm();
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({
      DATA: {
        filmReviews: fakeReviews,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Tabs film={fakeFilm} />
        </Router>
      </Provider>,
    );

    setTimeout(() => {
      expect(screen.getByText('Overview')).toBeInTheDocument();
      expect(screen.getByText('Details')).toBeInTheDocument();
      expect(screen.getByText('Reviews')).toBeInTheDocument();
      expect(screen.getAllByRole('listitem')
        .find((el) => el.innerText === 'Overview'))
        .toHaveClass('film-nav__item--active');
    }, 5000);
  });

  it('should change active class when click on tab', () => {
    const history = createMemoryHistory();
    const fakeFilm = makeFakeFilmsList()[0];
    const fakeFilmReview = makeFakeReviewsFilm();
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({
      DATA: {
        filmReviews: fakeFilmReview,
      },
      // DATA: {
      //   filmsList: [],
      //   film: [][0],
      //   favoriteFilms: [],
      //   similarFilms: [],
      //   filmReviews: fakeFilmReview,
      //   promoFilm: [][0],
      //   isLoadData: false,
      // },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Tabs film={fakeFilm} />
        </Router>
      </Provider>,
    );

    setTimeout(() => {
      screen.getAllByRole('listitem').forEach((el) => {
        userEvent.click(el);
        expect(el).toHaveClass('film-nav__item--active');
      });
    }, 5000);
  });
});
