import { createMemoryHistory } from 'history';
import { Route, Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import User from './user';
import { AppRoute, AuthorizationStatus } from '../../const';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();

describe('Component: User', () => {
  it('should render correctly when user is not authorized', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: { authorizationStatus: AuthorizationStatus.NoAuth },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <User />
        </Router>
      </Provider>,
    );
    expect(screen.queryByText('Sign in')).toBeInTheDocument();
    expect(screen.queryByAltText('User avatar')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
  });

  it('should render correctly when user is authorized', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      USER: { authorizationStatus: AuthorizationStatus.Auth },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <User />
        </Router>
      </Provider>,
    );
    expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
    expect(screen.queryByAltText('User avatar')).toBeInTheDocument();
    expect(screen.queryByText('Sign out')).toBeInTheDocument();
  });

  it('should redirect to SignIn when user is not authorized', () => {
    const history = createMemoryHistory();
    history.push('/fakePath');
    const store = mockStore({
      USER: { authorizationStatus: AuthorizationStatus.NoAuth },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={AppRoute.SignIn}>
            <h1>Mock SignIn page</h1>
          </Route>
          <Route>
            <User />
          </Route>
        </Router>
      </Provider>,
    );
    expect(screen.getByText('Sign in')).toBeInTheDocument();

    userEvent.click(screen.getByText('Sign in'));

    expect(screen.getByText('Mock SignIn page')).toBeInTheDocument();
  });

  it('should redirect to MyList when user click on avatar', () => {
    const history = createMemoryHistory();
    history.push('/fakePath');
    const store = mockStore({
      USER: { authorizationStatus: AuthorizationStatus.Auth },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={AppRoute.MyList}>
            <h1>Mock MyList page</h1>
          </Route>
          <Route>
            <User />
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.getByAltText('User avatar')).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();

    userEvent.click(screen.getByTestId('user-avatar'));

    expect(screen.getByText('Mock MyList page')).toBeInTheDocument();
  });

});
