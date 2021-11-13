import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import PlayBtn from './play-btn';


describe('Component: PlayBtn', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <PlayBtn />
      </Router>,
    );

    expect(screen.getByText('Play')).toBeInTheDocument();
  });
});
