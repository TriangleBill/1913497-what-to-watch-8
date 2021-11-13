import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import { FilmsList } from './films-list';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();

describe('Component: FilmsList', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      DATA: {
        filmsList: [],
      },
      FILMS: {genre: 'All genres'},
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <FilmsList />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Films not found')).toBeInTheDocument();
  });
});
