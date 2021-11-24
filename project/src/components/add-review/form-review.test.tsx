import { createMemoryHistory } from 'history';
import { Route, Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import FormReview from './form-review';
import { makeFakeFilmsList } from './../../store/utils/mocks';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';


describe('Component: FormReview', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const fakeFilm = makeFakeFilmsList()[0];

    const mockStore = configureMockStore([thunk]);
    const store = mockStore();

    render(
      <Provider store={store}>
        <Router history={history}>
          <FormReview reviewFilm={fakeFilm} />
        </Router>
      </Provider>,
    );

    for (let index = 1; index < 11; index++) {
      expect(screen.getByDisplayValue(index)).toBeInTheDocument();
    }
    expect(screen.getByPlaceholderText('Review text')).toBeInTheDocument();
    expect(screen.getByText('Post')).toBeInTheDocument();
  });

  it('should choice star when user click on star', () => {
    const history = createMemoryHistory();
    const fakeFilm = makeFakeFilmsList()[0];
    const mockStore = configureMockStore([thunk]);
    const store = mockStore();

    render(
      <Provider store={store}>
        <Router history={history}>
          <FormReview reviewFilm={fakeFilm} />
        </Router>
      </Provider>,
    );

    for (let index = 1; index < 11; index++) {
      userEvent.click(screen.getByDisplayValue(index));
      expect(screen.getByDisplayValue(index)).toBeChecked();
    }

  });

  it('button should become active when input is correct', () => {
    const history = createMemoryHistory();
    const fakeFilm = makeFakeFilmsList()[0];
    const mockStore = configureMockStore([thunk]);
    const store = mockStore();

    render(
      <Provider store={store}>
        <Router history={history}>
          <FormReview reviewFilm={fakeFilm} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Post')).toBeDisabled();

    userEvent.click(screen.getByDisplayValue(5));
    userEvent.type(screen.getByTestId('review-text'),
      `Lorem ipsum dolor sit amet, 
     consectetur adipiscing elit, sed do eiusmod tempor 
     incididunt ut labore et dolore magna aliqua. 
     Ut enim ad minim veniam, quis nostrud exercitation ullamco 
     laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
     irure dolor in reprehenderit in voluptate velit esse cillum dolore 
     eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
     proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

    expect(screen.getByText('Post')).not.toBeDisabled();

  });

  it('should redirect to Film when user submit form', () => {
    const history = createMemoryHistory();
    history.push('/fakePath');
    const fakeFilm = makeFakeFilmsList()[0];
    const mockStore = configureMockStore([thunk]);
    const store = mockStore();

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path={`/films/${fakeFilm.id}`}>
            <h1>Mock Film page</h1>
          </Route>
          <Route>
            <FormReview reviewFilm={fakeFilm} />
          </Route>
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByText('Post'));

    setTimeout(() => {
      expect(screen.getByText('Mock Film page')).toBeInTheDocument();
    }, 5000);

  });
});
