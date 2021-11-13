import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import FormReview from './form-review';
import { makeFakeFilmsList } from './../../store/utils/mocks';


describe('Component: Page404', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const fakeFilm = makeFakeFilmsList()[0];
    render(
      <Router history={history}>
        <FormReview reviewFilm={fakeFilm} />
      </Router>,
    );
    for (let index = 1; index < 11; index++) {
      expect(screen.getByDisplayValue(index)).toBeInTheDocument();
    }
    expect(screen.getByPlaceholderText('Review text')).toBeInTheDocument();
    expect(screen.getByText('Post')).toBeInTheDocument();
  });
});
