import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import LoadingScreen from './loading-screen';


describe('Component: LoadinScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <LoadingScreen />
      </Router>,
    );


    expect(screen.getByText('Loading ...')).toBeInTheDocument();
  });
});
