import { createMemoryHistory } from 'history';
import { Route, Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import AddReviewBtn from './add-review-btn';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '../../const';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const storeNoAuth = mockStore({
  USER: { authorizationStatus: AuthorizationStatus.NoAuth },
});
const storeAuth = mockStore({
  USER: { authorizationStatus: AuthorizationStatus.Auth },
});

describe('Component: AddReviewBtn', () => {
  it('should render correctly when user authorized', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={storeAuth}>
        <Router history={history}>
          <AddReviewBtn id={1} />
        </Router>
      </Provider>,
    );

    expect(screen.queryByText('Add review')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should render correctly when user not authorized', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={storeNoAuth}>
        <Router history={history}>
          <AddReviewBtn id={1} />
        </Router>
      </Provider>,
    );

    expect(screen.queryByText('Add review')).not.toBeInTheDocument();

  });

  it('should redirect to AddReview page', () => {
    const history = createMemoryHistory();
    history.push('/fake');
    const fakeId = 1;

    render(
      <Provider store={storeAuth}>
        <Router history={history}>
          <Route exact path={`/films/${fakeId}/review`}>
            <h1>Mock AddReview page</h1>
          </Route>
          <Route>
            <AddReviewBtn id={fakeId} />
          </Route>
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByRole('link'));

    expect(screen.getByText('Mock AddReview page')).toBeInTheDocument();

  });
});
