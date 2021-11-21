import { createMemoryHistory } from 'history';
import { Route, Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import Logo from './logo';
import { AppRoute } from '../../const';
import userEvent from '@testing-library/user-event';


describe('Component: Logo', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Logo />
      </Router>,
    );

    expect(screen.getAllByText('W')[0]).toBeInTheDocument();
    expect(screen.getAllByText('W')[1]).toBeInTheDocument();
    expect(screen.getByText('T')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should redirect to Main', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Route exact path={AppRoute.Main}>
          <h1>Mock Main page</h1>
        </Route>
        <Route>
          <Logo />
        </Route>
      </Router>,
    );

    userEvent.click(screen.getByRole('link'));

    expect(screen.getByText('Mock Main page')).toBeInTheDocument();
  });
});
