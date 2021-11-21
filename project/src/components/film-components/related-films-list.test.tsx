import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import RelatedFilmsList from './related-films-list';
import { makeFakeFilmsList } from '../../store/utils/mocks';


describe('Component: RelatedFilmsList', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const fakeFilms = makeFakeFilmsList();

    const { rerender } = render(
      <Router history={history}>
        <RelatedFilmsList films={[]} filmId={1} />
      </Router>,
    );

    expect(screen.getByText('Related films not found')).toBeInTheDocument();

    rerender(
      <Router history={history}>
        <RelatedFilmsList films={fakeFilms} filmId={1} />
      </Router>,
    );

    expect(screen.getByText(fakeFilms[0].name)).toBeInTheDocument();
  });
});
