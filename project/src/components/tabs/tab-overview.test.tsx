import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import { makeFakeFilmsList } from './../../store/utils/mocks';
import TabOverview from './tab-overview';


describe('Component: TabOverview', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const fakeFilm = makeFakeFilmsList()[0];

    const { container } = render(
      <Router history={history}>
        <TabOverview film={fakeFilm} />
      </Router>,
    );
    setTimeout(() => {
      expect(screen.getByText(fakeFilm.rating)).toBeInTheDocument();
      expect(container.querySelector('.film-rating__level')).toBeInTheDocument();
      expect(screen.getByText(`${fakeFilm.scoresCount  } ratings`)).toBeInTheDocument();
      expect(screen.getByText(`Director: ${  fakeFilm.director}`)).toBeInTheDocument();
      expect(screen.getByText(`Starring:${  fakeFilm.starring.join(', ')}`)).toBeInTheDocument();
      expect(screen.getByText(fakeFilm.description)).toBeInTheDocument();
    }, 5000);

  });
});
