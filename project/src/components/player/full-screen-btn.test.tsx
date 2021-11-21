import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import FullScreenBtn from './full-screen-btn';
import userEvent from '@testing-library/user-event';

const requestFullscreen = jest.fn();
window.HTMLMediaElement.prototype.requestFullscreen = requestFullscreen;

describe('Component: FullScreenBtn', () => {
  it('should render correctly when user authorized', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <FullScreenBtn videoRef={window.HTMLVideoElement.prototype} />
      </Router>,
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Full screen')).toBeInTheDocument();
  });

  it('should open video in full screen when clicked', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <FullScreenBtn videoRef={window.HTMLVideoElement.prototype} />
      </Router>,
    );


    userEvent.click(screen.getByRole('button'));
    expect(requestFullscreen).toBeCalled();
  });
});
