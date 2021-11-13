import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { AuthorizationStatus, AppRoute} from '../../const';
import App from './app';
import { makeFakeFilmsList } from './../../store/utils/mocks';

const mockStore = configureMockStore();
const fakeFilmsList = makeFakeFilmsList();
const store = mockStore({
  USER: { authorizationStatus: AuthorizationStatus.Auth },
  FILMS: { genre: 'All genre' },
  DATA: {
    filmsList: fakeFilmsList,
    isLoadData: false,
  },
});

const history = createMemoryHistory();
const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "Main" when user navigate to "/"', () => {
    history.push(AppRoute.Main);
    render(fakeApp);

    expect(screen.getByText('Show more')).toBeInTheDocument();
    expect(screen.getByText('© 2021 What to watch Ltd.')).toBeInTheDocument();
  });

  it('should render "SignIn" when user navigate to "/login"', () => {
    history.push(AppRoute.SignIn);
    render(fakeApp);

    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('© 2021 What to watch Ltd.')).toBeInTheDocument();
  });

  it('should render "MyList" when user navigate to "/mylist"', () => {
    history.push(AppRoute.MyList);
    render(fakeApp);

    expect(screen.getByText('My list')).toBeInTheDocument();
    expect(screen.getByText('© 2021 What to watch Ltd.')).toBeInTheDocument();
  });

  it('should render "Film" when user navigate to "/film"', () => {
    history.push(`/films/${fakeFilmsList[0].id}`);
    render(fakeApp);

    expect(screen.getByText('More like this')).toBeInTheDocument();
    expect(screen.getByText('© 2021 What to watch Ltd.')).toBeInTheDocument();
  });

  it('should render "AddReview" when user navigate to "/review"', () => {
    history.push(`/films/${fakeFilmsList[0].id}/review`);
    render(fakeApp);

    expect(screen.getByText('Add review')).toBeInTheDocument();
    expect(screen.getByText('WTW')).toBeInTheDocument();
  });

  it('should render "Player" when user navigate to "/player"', () => {
    history.push(`/player/${fakeFilmsList[0].id}`);
    render(fakeApp);

    expect(screen.getByText('Full screen')).toBeInTheDocument();
    expect(screen.getByText('Transpotting')).toBeInTheDocument();
    expect(screen.getByText('Exit')).toBeInTheDocument();
  });

  it('should render "Page404" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeApp);

    expect(screen.getByText('404 page not found')).toBeInTheDocument();
    expect(screen.getByText('Go back to the home page')).toBeInTheDocument();
  });
});
