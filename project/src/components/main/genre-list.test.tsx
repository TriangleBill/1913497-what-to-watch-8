import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import { makeFakeFilmsList } from './../../store/utils/mocks';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { GenreList } from './genre-list';

const mockStore = configureMockStore();

describe('Component: GenreList', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      FILMS: { genre: 'All genre' },
      DATA: {
        filmsList: makeFakeFilmsList(),
        isLoadData: false,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <GenreList />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('All genres')).toBeInTheDocument();
  });
});
