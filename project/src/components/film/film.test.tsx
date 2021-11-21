import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '../../const';
import { makeFakeFilmsList } from './../../store/utils/mocks';
import thunk from 'redux-thunk';
import Film from './film';
import ReactRouter from 'react-router';


const mockStore = configureMockStore([thunk]);
const fakeFilmsList = makeFakeFilmsList();

const storeAuth = mockStore({
  USER: { authorizationStatus: AuthorizationStatus.Auth },
  FILMS: { genre: 'All genre', shownFilms: 8 },
  DATA: {
    filmsList: fakeFilmsList,
    isLoadData: false,
    favoriteFilms: fakeFilmsList.slice(0, 8),
    promoFilm: fakeFilmsList[0],
  },
});

const storeNoAuth = mockStore({
  USER: { authorizationStatus: AuthorizationStatus.Auth },
  FILMS: { genre: 'All genre', shownFilms: 8 },
  DATA: {
    filmsList: fakeFilmsList,
    isLoadData: false,
    favoriteFilms: fakeFilmsList.slice(0, 8),
    promoFilm: fakeFilmsList[0],
  },
});

describe('Component: Film', () => {
  it('should render correct', () => {
    const history = createMemoryHistory();
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: String(fakeFilmsList[0].id) });

    const { rerender } = render(
      <Provider store={storeAuth}>
        <Router history={history}>
          <Film />
        </Router>
      </Provider>,
    );

    setTimeout(() => {
      expect(screen.getByText(fakeFilmsList[0].name)).toBeInTheDocument();
      expect(screen.getByText(fakeFilmsList[0].genre)).toBeInTheDocument();
      expect(screen.getByText(fakeFilmsList[0].released)).toBeInTheDocument();
      expect(screen.getByAltText(fakeFilmsList[0].name)).toBeInTheDocument();
      expect(screen.getByText('Play')).toBeInTheDocument();
      expect(screen.getByText('MyList')).toBeInTheDocument();
      expect(screen.getByText('Add review')).toBeInTheDocument();
      expect(screen.getByText('Overview')).toBeInTheDocument();
      expect(screen.getByText('Details')).toBeInTheDocument();
      expect(screen.getByText('Reviews')).toBeInTheDocument();
      expect(screen.getByText('More like this')).toBeInTheDocument();
    }, 5000);

    rerender(
      <Provider store={storeNoAuth}>
        <Router history={history}>
          <Film />
        </Router>
      </Provider>,
    );

    setTimeout(() => {
      expect(screen.getByText('Add review')).not.toBeInTheDocument();
    }, 5000);
  });
});
