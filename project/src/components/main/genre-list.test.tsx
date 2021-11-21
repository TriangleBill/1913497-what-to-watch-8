import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import { makeFakeFilmsList } from './../../store/utils/mocks';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { GenreList } from './genre-list';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';
import { ActionType } from '../../types/action';

const mockStore = configureMockStore();
const fakeFilms = makeFakeFilmsList();

describe('Component: GenreList', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      FILMS: { genre: 'All genre', shownFilms: 8 },
      DATA: {
        filmsList: fakeFilms,
        isLoadData: false,
        favoriteFilms: fakeFilms.slice(0, 8),
        promoFilm: fakeFilms[0],
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

  it('genre should become active when user click on genre', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    const history = createMemoryHistory();
    const store = mockStore({
      FILMS: { genre: 'All genre', shownFilms: 8 },
      DATA: {
        filmsList: fakeFilms,
        isLoadData: false,
        favoriteFilms: fakeFilms.slice(0, 8),
        promoFilm: fakeFilms[0],
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <GenreList />
        </Router>
      </Provider>,
    );

    const genres = screen.queryAllByRole('link');
    for (let index = 0; index < genres.length; index++) {
      userEvent.click(genres[index]);
      expect(genres[index]).toHaveClass('catalog__genres-item--active');
      expect(useDispatch).toBeCalledTimes(2);
      expect(dispatch).nthCalledWith(2, {
        type: ActionType.ChangeGenre,
      }, {
        type: ActionType.resetShownFilms,
      });
    }
  });
});
