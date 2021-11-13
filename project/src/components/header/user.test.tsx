import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import User from './user';
import { AuthorizationStatus } from '../../const';

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

});
