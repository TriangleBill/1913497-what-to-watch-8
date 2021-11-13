import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import AddReviewBtn from './add-review-btn';


describe('Component: AddReviewBtn', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <AddReviewBtn id={1} />
      </Router>,
    );

    expect(screen.getByText('Add review')).toBeInTheDocument();
  });
});
