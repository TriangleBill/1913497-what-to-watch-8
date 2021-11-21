import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import PauseBtn from './pause-btn';
import userEvent from '@testing-library/user-event';


describe('Component: PauseBtn', () => {
  it('should render correctly when user authorized', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <PauseBtn onClick={()=> void 0} />
      </Router>,
    );

    expect(screen.queryByText('Pause')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should called prop function when clicked', () => {
    const history = createMemoryHistory();
    const propFunction = jest.fn();

    render(
      <Router history={history}>
        <PauseBtn onClick={propFunction} />
      </Router>,
    );

    userEvent.click(screen.getByTestId('svg-pause'));
    expect(propFunction).toBeCalled();
  });
});
