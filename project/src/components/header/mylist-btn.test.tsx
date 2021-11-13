import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import MylistBtn from './mylist-btn';


describe('Component: MyListBtn', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <MylistBtn />
      </Router>,
    );

    expect(screen.getByText('My list')).toBeInTheDocument();
  });
});
