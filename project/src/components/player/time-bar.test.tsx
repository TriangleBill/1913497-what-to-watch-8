import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import TimeBar from './time-bar';

describe('Component: TimeBar', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const timePercent = 0;

    render(
      <Router history={history}>
        <TimeBar
          videoRef={window.HTMLVideoElement.prototype}
          filmIsPlayed={false}
        />
      </Router>,
    );

    setTimeout(() => {
      expect(screen.queryByText('Toggler')).toBeInTheDocument();
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
      expect(screen.queryByText('Toggler')).toHaveValue(timePercent);
      expect(screen.queryByTestId('Toggler')).toHaveStyle(`left: ${timePercent}%`);
    }, 5000);
  });
});
