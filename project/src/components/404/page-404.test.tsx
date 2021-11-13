import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import Page404 from './page-404';
import { render, screen } from '@testing-library/react';


describe('Component: Page404', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Page404 />
      </Router>,
    );


    expect(screen.getByText('404 page not found')).toBeInTheDocument();
    expect(screen.getByText('Go back to the home page')).toBeInTheDocument();
  });
});
