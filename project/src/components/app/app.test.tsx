import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus, AppRoute } from '../../const';
import App from './app';
import { makeFakeFilmsList } from './../../store/utils/mocks';
import { mosckPromoFilm } from './../../store/films-data/films-data';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);
const fakeFilmsList = makeFakeFilmsList();
const storeNoAuth = mockStore({
  USER: { authorizationStatus: AuthorizationStatus.NoAuth },
  FILMS: { genre: 'All genre', shownFilms: 8 },
  DATA: {
    filmsList: fakeFilmsList,
    isLoadData: false,
    favoriteFilms: fakeFilmsList.slice(0, 8),
    promoFilm: mosckPromoFilm,
  },
});

const storeAuth = mockStore({
  USER: { authorizationStatus: AuthorizationStatus.Auth },
  FILMS: { genre: 'All genre', shownFilms: 8 },
  DATA: {
    filmsList: fakeFilmsList,
    isLoadData: false,
    favoriteFilms: fakeFilmsList.slice(0, 8),
    promoFilm: mosckPromoFilm,
  },
});

const history = createMemoryHistory();
const fakeAppNoAuth = (
  <Provider store={storeNoAuth}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

const fakeAppAuth = (
  <Provider store={storeAuth}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "Main" when user navigate to "/"', () => {
    history.push(AppRoute.Main);
    render(fakeAppNoAuth);

    expect(screen.getByText('All genres')).toBeInTheDocument();
    expect(screen.getByText('Play')).toBeInTheDocument();
    expect(screen.getByText('My list')).toBeInTheDocument();
    expect(screen.getByText('© 2021 What to watch Ltd.')).toBeInTheDocument();
  });

  it('should render "SignIn" when user navigate to "/login"', () => {
    history.push(AppRoute.SignIn);
    render(fakeAppNoAuth);

    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('© 2021 What to watch Ltd.')).toBeInTheDocument();
  });

  it('should render "MyList" when user navigate to "/mylist"', () => {
    history.push(AppRoute.MyList);
    render(fakeAppAuth);

    expect(screen.getByText('My list')).toBeInTheDocument();
    expect(screen.getByText('© 2021 What to watch Ltd.')).toBeInTheDocument();
  });

  it('should render "Film" when user navigate to "/film"', () => {
    history.push(`/films/${fakeFilmsList[0].id}`);
    render(fakeAppNoAuth);

    setTimeout(() => {
      expect(screen.getByText('My list')).toBeInTheDocument();
      expect(screen.getByText('Play')).toBeInTheDocument();
      expect(screen.getByText('Add review')).toBeInTheDocument();
      expect(screen.getByText('Overview')).toBeInTheDocument();
      expect(screen.getByText('Details')).toBeInTheDocument();
      expect(screen.getByText('Reviews')).toBeInTheDocument();
      expect(screen.getByText('More like this')).toBeInTheDocument();
      expect(screen.getByText('© 2021 What to watch Ltd.')).toBeInTheDocument();
    }, 5000);
  });

  it('should render "AddReview" when user navigate to "/review"', () => {
    history.push(`/films/${fakeFilmsList[0].id}/review`);
    render(fakeAppAuth);

    expect(screen.getByText('Add review')).toBeInTheDocument();
    expect(screen.getByText('WTW')).toBeInTheDocument();
    expect(screen.getByText('Post')).toBeInTheDocument();
  });

  it('should render "Player" when user navigate to "/player"', () => {
    history.push(`/player/${fakeFilmsList[0].id}`);
    render(fakeAppNoAuth);

    expect(screen.getByText('Full screen')).toBeInTheDocument();
    expect(screen.getByText('Transpotting')).toBeInTheDocument();
    expect(screen.getByText('Exit')).toBeInTheDocument();
  });

  it('should render "Page404" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeAppNoAuth);

    expect(screen.getByText('404 page not found')).toBeInTheDocument();
    expect(screen.getByText('Go back to the home page')).toBeInTheDocument();
  });
});
