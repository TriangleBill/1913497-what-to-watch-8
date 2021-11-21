import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import TabsContent from './tabs-content';
import { makeFakeFilmsList } from '../../store/utils/mocks';
import { makeFakeReviewsFilm } from './../../store/utils/mocks';

describe('Component: TabsContent', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const fakeFilm = makeFakeFilmsList()[0];
    const fakeFilmReviews = makeFakeReviewsFilm();

    const { container, rerender } = render(
      <Router history={history}>
        <TabsContent
          film={fakeFilm}
          activeTab='Overview'
          filmReviews={fakeFilmReviews}
        />
      </Router>,
    );
    setTimeout(() => {
      expect(screen.getByText(fakeFilm.rating)).toBeInTheDocument();
      expect(container.querySelector('.film-rating__level')).toBeInTheDocument();
      expect(screen.getByText(`${fakeFilm.scoresCount  } ratings`)).toBeInTheDocument();
      expect(screen.getByText(`Director: ${  fakeFilm.director}`)).toBeInTheDocument();
      expect(screen.getByText(`Starring:${  fakeFilm.starring.join(', ')}`)).toBeInTheDocument();
      expect(screen.queryByText(fakeFilm.description)).toBeInTheDocument();
    }, 5000);

    rerender(
      <Router history={history}>
        <TabsContent
          film={fakeFilm}
          activeTab='Details'
          filmReviews={fakeFilmReviews}
        />
      </Router>,
    );
    setTimeout(() => {
      expect(screen.getByText('Director')).toBeInTheDocument();
      expect(screen.getByText(fakeFilm.director)).toBeInTheDocument();
      expect(screen.getByText('Starring')).toBeInTheDocument();
      fakeFilm.starring.forEach((el) => {
        expect(screen.getByText(el)).toBeInTheDocument();
      });
      expect(screen.getByText('Run Time')).toBeInTheDocument();
      expect(screen.getByText('Genre')).toBeInTheDocument();
      expect(screen.getByText(fakeFilm.genre)).toBeInTheDocument();
      expect(screen.getByText('Released')).toBeInTheDocument();
      expect(screen.getByText(fakeFilm.released)).toBeInTheDocument();
    }, 5000);

    rerender(
      <Router history={history}>
        <TabsContent
          film={fakeFilm}
          activeTab='Reviews'
          filmReviews={fakeFilmReviews}
        />
      </Router>,
    );
    setTimeout(() => {
      expect(screen.getByText(fakeFilmReviews[0].rating)).toBeInTheDocument();
      expect(screen.getByText(fakeFilmReviews[1].rating)).toBeInTheDocument();
      expect(screen.getByText(fakeFilmReviews[0].user.name)).toBeInTheDocument();
      expect(screen.getByText(fakeFilmReviews[1].user.name)).toBeInTheDocument();
      expect(screen.getByText(fakeFilmReviews[0].comment)).toBeInTheDocument();
      expect(screen.getByText(fakeFilmReviews[1].comment)).toBeInTheDocument();
    }, 5000);

    rerender(
      <Router history={history}>
        <TabsContent
          film={fakeFilm}
          activeTab='fake active tab'
          filmReviews={fakeFilmReviews}
        />
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
