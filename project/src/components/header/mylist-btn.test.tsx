import { createMemoryHistory } from 'history';
import { Route, Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import MylistBtn from './mylist-btn';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeFilmsList } from './../../store/utils/mocks';
import { AppRoute, AuthorizationStatus } from '../../const';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();

describe('Component: MyListBtn', () => {
  it('should render correctly when film is favorite', () => {
    const fakeFilms = makeFakeFilmsList();
    const history = createMemoryHistory();
    const store = mockStore({
      USER: { authorizationStatus: AuthorizationStatus.Auth },
      DATA: { favoriteFilms: fakeFilms.slice(0, 8) },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <MylistBtn film={fakeFilms[0]} />
        </Router>
      </Provider>,
    );

    expect(screen.queryByTestId('film is favotite')).toBeInTheDocument();
    expect(screen.queryByTestId('film is not favotite')).not.toBeInTheDocument();
    expect(screen.getByText('My list')).toBeInTheDocument();
  });

  it('should render correctly when film is not favorite', () => {
    const fakeFilms = makeFakeFilmsList();
    const history = createMemoryHistory();
    const store = mockStore({
      USER: { authorizationStatus: AuthorizationStatus.Auth },
      DATA: { favoriteFilms: makeFakeFilmsList() },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <MylistBtn film={fakeFilms[0]} />
        </Router>
      </Provider>,
    );

    expect(screen.queryByTestId('film is favotite')).not.toBeInTheDocument();
    expect(screen.queryByTestId('film is not favotite')).toBeInTheDocument();
    expect(screen.getByText('My list')).toBeInTheDocument();
  });

  it('if user autorized should rerender when user click', () => {
    const fakeFilms = makeFakeFilmsList();
    const history = createMemoryHistory();
    const store = mockStore({
      USER: { authorizationStatus: AuthorizationStatus.Auth },
      DATA: { favoriteFilms: [fakeFilms[1]] },
    });

    const { rerender } = render(
      <Provider store={store}>
        <Router history={history}>
          <MylistBtn film={fakeFilms[0]} />
        </Router>
      </Provider>,
    );

    expect(screen.queryByTestId('film is favotite')).not.toBeInTheDocument();
    expect(screen.queryByTestId('film is not favotite')).toBeInTheDocument();

    userEvent.click(screen.getByText('My list'));

    rerender(
      <Provider store={store}>
        <Router history={history}>
          <MylistBtn film={fakeFilms[1]} />
        </Router>
      </Provider>,
    );

    expect(screen.queryByTestId('film is favotite')).toBeInTheDocument();
    expect(screen.queryByTestId('film is not favotite')).not.toBeInTheDocument();
  });

  it('if user not autorized should redirect to SignIn when user click', () => {
    const fakeFilms = makeFakeFilmsList();
    const history = createMemoryHistory();
    history.push('/fakePath');
    const store = mockStore({
      USER: { authorizationStatus: AuthorizationStatus.NoAuth },
      DATA: { favoriteFilms: [fakeFilms[1]] },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={AppRoute.SignIn}>
            <h1>Mock SignIn page</h1>
          </Route>
          <Route>
            <MylistBtn film={fakeFilms[0]} />
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.getByText('My list')).toBeInTheDocument();

    userEvent.click(screen.getByText('My list'));

    expect(screen.getByText('Mock SignIn page')).toBeInTheDocument();
  });


});
