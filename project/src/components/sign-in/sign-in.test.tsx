import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import { makeFakeFilmsList } from './../../store/utils/mocks';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '../../const';
import { Provider } from 'react-redux';
import SignIn from './sign-in';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();

describe('Component: SignIn', () => {
  it('should render "SignIn" when  user navigate to "login" url', () => {
    const history = createMemoryHistory();
    history.push('/login');

    const store = mockStore({
      USER: { authorizationStatus: AuthorizationStatus.NoAuth },
      FILMS: { genre: 'All genre' },
      DATA: {
        filmsList: makeFakeFilmsList(),
        isLoadData: false,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <SignIn />
        </Router>
      </Provider>,
    );

    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('© 2021 What to watch Ltd.')).toBeInTheDocument();

    userEvent.type(screen.getByTestId('login'), 'test@mail.ru');
    userEvent.type(screen.getByTestId('password'), 'QWE123');

    expect(screen.getByDisplayValue('test@mail.ru')).toBeInTheDocument();
    expect(screen.getByDisplayValue('QWE123')).toBeInTheDocument();
  });
});
