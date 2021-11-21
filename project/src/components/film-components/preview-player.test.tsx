import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import { makeFakeFilmsList } from './../../store/utils/mocks';
import PreviewPlayer from './preview-player';

const play = jest.fn();
const load = jest.fn();
const pause = jest.fn();


window.HTMLMediaElement.prototype.play = play;
window.HTMLMediaElement.prototype.load = load;
window.HTMLMediaElement.prototype.pause = pause;

describe('Component: PreviewPlayer', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const fakeFilmData = makeFakeFilmsList()[0];
    const { rerender } = render(
      <Router history={history}>
        <PreviewPlayer
          src={fakeFilmData.previewVideoLink}
          poster={fakeFilmData.previewImage}
          filmId={fakeFilmData.id}
          activeFilm={fakeFilmData.id}
        />
      </Router>,
    );

    expect(screen.getByTestId('video')).toBeInTheDocument();
    expect(play).toBeCalled();

    rerender(
      <Router history={history}>
        <PreviewPlayer
          src={fakeFilmData.previewVideoLink}
          poster={fakeFilmData.previewImage}
          filmId={fakeFilmData.id}
          activeFilm={makeFakeFilmsList()[0].id}
        />
      </Router>,
    );

    expect(pause).toBeCalled();
    expect(load).toBeCalled();
  });


});
