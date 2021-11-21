
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { AuthorizationStatus } from '../../const';
import { makeFakeFilmsList } from '../../store/utils/mocks';
import { Router } from 'react-router-dom';
import Player from './player';
import ReactRouter from 'react-router';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore([thunk]);
const fakeFilmsList = makeFakeFilmsList();
const history = createMemoryHistory();

const play = jest.fn();
const pause = jest.fn();
window.HTMLVideoElement.prototype.play = play;
window.HTMLVideoElement.prototype.pause = pause;

describe('Component: Player', () => {
  it('should render correctly', () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: String(fakeFilmsList[0].id) });
    const store = mockStore({
      USER: { authorizationStatus: AuthorizationStatus.NoAuth },
      FILMS: { genre: 'All genre', shownFilms: 8 },
      DATA: {
        filmsList: fakeFilmsList,
        isLoadData: false,
        favoriteFilms: fakeFilmsList.slice(0, 8),
        promoFilm: fakeFilmsList[0],
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Player films={fakeFilmsList} />
        </Router>
      </Provider>,
    );

    setTimeout(() => {
      expect(screen.getByText('Transpotting')).toBeInTheDocument();
      expect(screen.getByText('Exit')).toBeInTheDocument();
      expect(screen.getByText('Full screan')).toBeInTheDocument();
      expect(screen.getByText('Play')).toBeInTheDocument();
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    }, 5000);
  });

  it('should play/paused video when user click on play/pause', () => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: String(fakeFilmsList[0].id) });
    const store = mockStore({
      USER: { authorizationStatus: AuthorizationStatus.NoAuth },
      FILMS: { genre: 'All genre', shownFilms: 8 },
      DATA: {
        filmsList: fakeFilmsList,
        isLoadData: false,
        favoriteFilms: fakeFilmsList.slice(0, 8),
        promoFilm: fakeFilmsList[0],
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Player films={fakeFilmsList} />
        </Router>
      </Provider>,
    );

    setTimeout(() => {
      userEvent.click(screen.getByText('Play'));
      expect(screen.getByText('Play')).not.toBeInTheDocument();
      expect(screen.getByText('Pause')).toBeInTheDocument();
      expect(play).toBeCalled();

      userEvent.click(screen.getByText('Pause'));
      expect(screen.getByText('Play')).toBeInTheDocument();
      expect(screen.getByText('Pause')).not.toBeInTheDocument();
      expect(pause).toBeCalled();
    }, 5000);
  });
});
