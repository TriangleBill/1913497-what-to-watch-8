import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import PlayBtn from './play-btn';


describe('Component: PlayBtn', () => {
  it('should render correctly when user authorized', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <PlayBtn handleClick={()=> void 0} />
      </Router>,
    );

    expect(screen.queryByText('Play')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should called prop function when clicked', () => {
    const history = createMemoryHistory();
    const propFunction = jest.fn();

    render(
      <Router history={history}>
        <PlayBtn handleClick={propFunction} />
      </Router>,
    );

    userEvent.click(screen.getByTestId('svg-play'));
    expect(propFunction).toBeCalled();
  });
});
