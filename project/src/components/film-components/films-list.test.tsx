import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import { FilmsList } from './films-list';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { makeFakeFilmsList } from '../../store/utils/mocks';

const mockStore = configureMockStore();

describe('Component: FilmsList', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const fakeFilmsList = makeFakeFilmsList();
    const store = mockStore({
      DATA: {
        filmsList: [],
      },
      FILMS: { genre: 'All genres' },
    });
    const { rerender } = render(
      <Provider store={store}>
        <Router history={history}>
          <FilmsList selector={() => fakeFilmsList} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(fakeFilmsList[0].name)).toBeInTheDocument();
    expect(screen.getByText(fakeFilmsList[1].name)).toBeInTheDocument();

    rerender(
      <Provider store={store}>
        <Router history={history}>
          <FilmsList selector={() => []} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Films not found')).toBeInTheDocument();
  });
});
