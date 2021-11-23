
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { makeFakeFilmsList } from '../../../store/utils/mocks';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import ShowMoreBtn from './show-more-btn';
import { render, screen } from '@testing-library/react';
import * as Redux from 'react-redux';
import userEvent from '@testing-library/user-event';
import { ActionType } from '../../../types/action';

const mockStore = configureMockStore([thunk]);
const fakeFilms = makeFakeFilmsList();
const store = mockStore({
  FILMS: { genre: 'All genre', shownFilms: 8 },
  DATA: {
    filmsList: fakeFilms,
    isLoadData: false,
    favoriteFilms: fakeFilms.slice(0, 8),
    promoFilm: fakeFilms[0],
  },
});

const storeManyFilms = mockStore({
  FILMS: { genre: 'All genre', shownFilms: 8 },
  DATA: {
    filmsList: fakeFilms
      .concat(fakeFilms)
      .concat(fakeFilms)
      .concat(fakeFilms)
      .concat(fakeFilms)
      .concat(fakeFilms)
      .concat(fakeFilms)
      .concat(fakeFilms)
      .concat(fakeFilms),
    isLoadData: false,
    favoriteFilms: fakeFilms.slice(0, 8),
    promoFilm: fakeFilms[0],
  },
});

const history = createMemoryHistory();

describe('Component: ShowMoreBtn', () => {
  it('should render correctly', () => {
    const { rerender } = render(
      <Provider store={store}>
        <Router history={history}>
          <ShowMoreBtn />
        </Router>
      </Provider>,
    );

    expect(screen.queryByText('Show more')).not.toBeInTheDocument();

    rerender(
      <Provider store={storeManyFilms}>
        <Router history={history}>
          <ShowMoreBtn />
        </Router>
      </Provider>,
    );

    setTimeout(() => {
      expect(screen.getByText('Show more')).toBeInTheDocument();
    }, 5000);
  });

  it('should dispatch shownFilms when click button', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={storeManyFilms}>
        <Router history={history}>
          <ShowMoreBtn />
        </Router>
      </Provider>,
    );

    setTimeout(() => {
      userEvent.click(screen.getByText('Show more'));
      expect(useDispatch).toBeCalledTimes(1);
      expect(dispatch).nthCalledWith(1, {
        type: ActionType.incrementShownFilms,
      });
    }, 5000);
  });
});
