import { createMemoryHistory } from 'history';
import { Route, Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExitBtn from './exit-btn';


describe('Component: ExitBtn', () => {

  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <ExitBtn filmId={1} />
      </Router>,
    );

    expect(screen.queryByText('Exit')).toBeInTheDocument();
    expect(screen.queryByRole('button')).toBeInTheDocument();
  });

  it('should redirect to Film when clicked', () => {
    const history = createMemoryHistory();
    const id = 1;
    render(
      <Router history={history}>
        <Route exact path={`/films/${id}`}>
          <h1>Mock Film page</h1>
        </Route>
        <Route>
          <ExitBtn filmId={id} />
        </Route>
      </Router>,
    );

    userEvent.click(screen.getByText('Exit'));
    expect(screen.getByText('Mock Film page')).toBeInTheDocument();
  });
});
