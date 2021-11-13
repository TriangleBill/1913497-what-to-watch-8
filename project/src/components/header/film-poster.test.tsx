import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import FilmPoster from './film-poster';
import faker from 'faker';


describe('Component: FilmsPoster', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const fakeName = faker.name.title();
    render(
      <Router history={history}>
        <FilmPoster filmPoster={faker.system.filePath()} filmName={fakeName}/>
      </Router>,
    );

    expect(screen.getByAltText(fakeName)).toBeInTheDocument();
  });
});
