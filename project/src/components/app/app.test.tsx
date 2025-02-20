import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus, AppRoute } from '../../const';
import App from './app';
import { makeFakeFilmsList, makeFakeReviewsFilm } from './../../store/utils/mocks';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);
const fakeFilmsList = makeFakeFilmsList();
const fakeReview = makeFakeReviewsFilm();
const mockPromoFilm = fakeFilmsList[0];
const storeNoAuth = mockStore({
  USER: { authorizationStatus: AuthorizationStatus.NoAuth },
  FILMS: { genre: 'All genre', shownFilms: 8 },
  DATA: {
    filmsList: fakeFilmsList,
    film: fakeFilmsList[0],
    favoriteFilms: fakeFilmsList,
    similarFilms: fakeFilmsList,
    filmReviews: fakeReview,
    promoFilm: mockPromoFilm,
    isLoadData: true,
  },
});

const storeAuth = mockStore({
  USER: { authorizationStatus: AuthorizationStatus.Auth },
  FILMS: { genre: 'All genre', shownFilms: 8 },
  DATA: {
    filmsList: fakeFilmsList,
    film: fakeFilmsList[0],
    favoriteFilms: fakeFilmsList,
    similarFilms: fakeFilmsList,
    filmReviews: fakeReview,
    promoFilm: mockPromoFilm,
    isLoadData: true,
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

    setTimeout(() => {
      expect(screen.getByText('All genres')).toBeInTheDocument();
      expect(screen.getByText('Play')).toBeInTheDocument();
      expect(screen.getByText('My list')).toBeInTheDocument();
      expect(screen.getByText('© 2021 What to watch Ltd.')).toBeInTheDocument();
    }, 5000);

  });

  it('should render "SignIn" when user navigate to "/login"', () => {
    history.push(AppRoute.SignIn);
    render(fakeAppNoAuth);

    setTimeout(() => {
      expect(screen.getByLabelText('Email address')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(screen.getByText('© 2021 What to watch Ltd.')).toBeInTheDocument();
    }, 5000);

  });

  it('should render "MyList" when user navigate to "/mylist"', () => {
    history.push(AppRoute.MyList);
    render(fakeAppAuth);
    setTimeout(() => {
      expect(screen.getByText('My list')).toBeInTheDocument();
      expect(screen.getByText('© 2021 What to watch Ltd.')).toBeInTheDocument();
    }, 5000);
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

    setTimeout(() => {
      expect(screen.getByText('Add review')).toBeInTheDocument();
      expect(screen.getByText('WTW')).toBeInTheDocument();
      expect(screen.getByText('Post')).toBeInTheDocument();
    }, 5000);

  });

  it('should render "Player" when user navigate to "/player"', () => {
    history.push(`/player/${fakeFilmsList[0].id}`);
    render(fakeAppNoAuth);

    setTimeout(() => {
      expect(screen.getByText('Full screen')).toBeInTheDocument();
      expect(screen.getByText('Transpotting')).toBeInTheDocument();
      expect(screen.getByText('Exit')).toBeInTheDocument();
    }, 5000);

  });

  it('should render "Page404" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeAppNoAuth);

    setTimeout(() => {
      expect(screen.getByText('404 page not found')).toBeInTheDocument();
      expect(screen.getByText('Go back to the home page')).toBeInTheDocument();
    }, 5000);

  });
});
