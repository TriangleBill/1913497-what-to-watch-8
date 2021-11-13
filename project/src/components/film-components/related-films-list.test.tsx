import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import RelatedFilmsList from './related-films-list';


describe('Component: RelatedFilmsList', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <RelatedFilmsList films={[]} filmGenre='All genres' filmId={1} />
      </Router>,
    );

    expect(screen.getByText('Related films not found')).toBeInTheDocument();
  });
});
