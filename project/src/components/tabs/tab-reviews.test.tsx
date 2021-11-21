import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import TabReviews from './tab-reviews';
import { makeFakeReviewsFilm } from './../../store/utils/mocks';


describe('Component: TabReviews', () => {
  const fakeFilmReviews = makeFakeReviewsFilm();

  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <TabReviews filmReviews={fakeFilmReviews} />
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

  });
});
