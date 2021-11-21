import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import MyList from './my-list';
import { makeFakeFilmsList } from './../../store/utils/mocks';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '../../const';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';


const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();
const fakeFilms = makeFakeFilmsList();
const storeNoFavorites = mockStore({
  USER: { authorizationStatus: AuthorizationStatus.NoAuth },
  FILMS: { genre: 'All genre', shownFilms: 8 },
  DATA: {
    filmsList: fakeFilms,
    isLoadData: false,
    favoriteFilms: makeFakeFilmsList(),
    promoFilm: fakeFilms[0],
  },
});

const storeFavorites = mockStore({
  USER: { authorizationStatus: AuthorizationStatus.Auth },
  FILMS: { genre: 'All genre', shownFilms: 8 },
  DATA: {
    filmsList: fakeFilms,
    isLoadData: false,
    favoriteFilms: fakeFilms.slice(0, 1),
    promoFilm: fakeFilms[0],
  },
});

describe('Component: MyList', () => {
  it('should render correctly', () => {
    const {rerender} = render(
      <Provider store={storeNoFavorites}>
        <Router history={history}>
          <MyList />
        </Router>
      </Provider>,
    );

    setTimeout(() => {
      expect(screen.getByText('My list')).toBeInTheDocument();
      expect(screen.getByText('Films not found')).toBeInTheDocument();
      expect(screen.getByText('© 2021 What to watch Ltd.')).toBeInTheDocument();
    }, 5000);

    rerender(
      <Provider store={storeFavorites}>
        <Router history={history}>
          <MyList />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('My list')).toBeInTheDocument();
    expect(screen.queryByText('Films not found')).not.toBeInTheDocument();
    expect(screen.getByText('© 2021 What to watch Ltd.')).toBeInTheDocument();

  });

});
