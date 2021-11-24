import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import Page404 from './page-404';
import { render, screen } from '@testing-library/react';
import { Switch, Route } from 'react-router-dom';
import { AppRoute } from '../../const';
import userEvent from '@testing-library/user-event';


describe('Component: Page404', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Page404 />
      </Router>,
    );


    setTimeout(() => {
      expect(screen.getByText('404 page not found')).toBeInTheDocument();
      expect(screen.getByText('Go back to the home page')).toBeInTheDocument();
    }, 5000);

  });

  it('should redirect to Main when user click button', () => {
    const history = createMemoryHistory();
    history.push('/qweqwe');
    render(
      <Router history={history}>
        <Switch>
          <Route exact path={'/qweqwe'}>
            <Page404 />
          </Route>
          <Route exact path={AppRoute.Main}><h1>Mock Main Screen</h1></Route>
        </Switch>
      </Router>,
    );
    setTimeout(() => {
      userEvent.click(screen.getByText('Go back to the home page'));
      expect(screen.getByText('Mock Main Screen')).toBeInTheDocument();
    }, 5000);

  });
});
