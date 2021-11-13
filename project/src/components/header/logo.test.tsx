import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import Logo from './logo';


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
  });
});
