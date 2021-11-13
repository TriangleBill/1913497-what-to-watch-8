import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import MyList from './my-list';
import { makeFakeFilmsList } from './../../store/utils/mocks';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '../../const';
import { Provider } from 'react-redux';


const mockStore = configureMockStore();

describe('Component: MyList', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
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
          <MyList films={makeFakeFilmsList()} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('My list')).toBeInTheDocument();
    expect(screen.getByText('© 2021 What to watch Ltd.')).toBeInTheDocument();
  });
});
