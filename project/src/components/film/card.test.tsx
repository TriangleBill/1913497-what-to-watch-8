import { createMemoryHistory } from 'history';
import { Route, Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import Card from './card';
import { makeFakeFilmsList } from '../../store/utils/mocks';
import faker from 'faker';
import userEvent from '@testing-library/user-event';

const play = jest.fn();
const pause = jest.fn();
const load = jest.fn();

window.HTMLMediaElement.prototype.play = play;
window.HTMLMediaElement.prototype.load = pause;
window.HTMLMediaElement.prototype.pause = load;

describe('Component: Card', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const fakeFilmData = makeFakeFilmsList()[0];
    const fakeMouseEvent = jest.fn();
    const fakeState = faker.datatype.number();
    render(
      <Router history={history}>
        <Card filmData={fakeFilmData} setActiveFilm={fakeMouseEvent} activeFilm={fakeState} />
      </Router>,
    );

    expect(screen.getByText(fakeFilmData.name)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });


  it('should play video when user over mouse', () => {
    const history = createMemoryHistory();
    const fakeFilmData = makeFakeFilmsList()[0];
    const fakeMouseEvent = jest.fn();
    const fakeState = faker.datatype.number();
    render(
      <Router history={history}>
        <Card filmData={fakeFilmData} setActiveFilm={fakeMouseEvent} activeFilm={fakeState} />
      </Router>,
    );

    userEvent.hover(screen.getByRole('article'));

    setTimeout(()=> {
      expect(play).toBeCalled();
    }, 1000);

    userEvent.unhover(screen.getByRole('article'));

    expect(pause).toBeCalled();
    expect(load).toBeCalled();
  });

  it('should redirect to Film when user click on card', () => {
    const history = createMemoryHistory();
    const fakeFilmData = makeFakeFilmsList()[0];
    const fakeMouseEvent = jest.fn();
    const fakeState = faker.datatype.number();
    render(
      <Router history={history}>
        <Route exact path={`/films/${fakeFilmData.id}`}>
          <h1>Mock Film page</h1>
        </Route>
        <Route>
          <Card filmData={fakeFilmData} setActiveFilm={fakeMouseEvent} activeFilm={fakeState} />
        </Route>
      </Router>,
    );

    userEvent.click(screen.getByRole('article'));

    expect(screen.getByText('Mock Film page')).toBeInTheDocument();
  });
});
