import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import TimeValue from './time-value';

describe('Component: TimeValue', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <TimeValue
          videoRef={null}
          filmIsPlayed={false}
        />
      </Router>,
    );

    setTimeout(() => {
      expect(screen.queryByText('00:00:00')).toBeInTheDocument();
    }, 5000);
  });
});
