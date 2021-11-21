import { createMemoryHistory } from 'history';
import { Route, Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import PlayBtn from './play-btn';
import userEvent from '@testing-library/user-event';


describe('Component: PlayBtn', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const fakeId = 1;

    render(
      <Router history={history}>
        <PlayBtn filmId={fakeId} />
      </Router>,
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Play')).toBeInTheDocument();
  });

  it('should redirect to Player when user click button', () => {
    const history = createMemoryHistory();
    const fakeId = 1;

    render(
      <Router history={history}>
        <Route exact path={`/player/${fakeId}`}>
          <h1>Mock Player Page</h1>
        </Route>
        <Route>
          <PlayBtn filmId={fakeId} />
        </Route>
      </Router>,
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Play')).toBeInTheDocument();

    userEvent.click(screen.getByText('Play'));

    expect(screen.getByText('Mock Player Page')).toBeInTheDocument();
  });
});
