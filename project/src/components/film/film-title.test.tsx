import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import { makeFakeFilmsList } from './../../store/utils/mocks';
import FilmTitle from './film-title';


describe('Component: FilmsTitle', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const fakeFilm = makeFakeFilmsList()[0];
    render(
      <Router history={history}>
        <FilmTitle filmGenre={fakeFilm.genre} filmName={fakeFilm.name} released={fakeFilm.released}/>
      </Router>,
    );

    expect(screen.getByText(fakeFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
    expect(screen.getByText(fakeFilm.released)).toBeInTheDocument();
  });
});
