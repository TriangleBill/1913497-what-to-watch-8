import Main from './../main/main';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignIn from './../signIn/signIn';
import MyList from './../myList/myList';
import Film from './../film/film';
import AddReview from './../addReview/addReview';
import Player from './../player/player';
import Page404 from '../404/page404';
import PrivateRoute from './../privateRoute';
import { AppRoute, AuthorizationStatus } from '../../const';

type appProps = {
  filmName: string,
  genre: string,
  releasedYear: number
}

function App({ filmName, genre, releasedYear }: appProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Main} exact>
          <Main filmName={filmName} genre={genre} releasedYear={releasedYear} />
        </Route>

        <Route path={AppRoute.SignIn} exact>
          <SignIn />
        </Route>

        <PrivateRoute
          path={AppRoute.MyList}
          exact
          render={() => <MyList />}
          autorizationStatus={AuthorizationStatus.NoAuth}
        >

        </PrivateRoute>

        <Route path={AppRoute.Film} exact>
          <Film />
        </Route>

        <Route path={AppRoute.AddReview} exact>
          <AddReview />
        </Route>

        <Route path={AppRoute.Player} exact>
          <Player />
        </Route>

        <Route exact>
          <Page404 />
        </Route>
      </Switch>
    </BrowserRouter>


  );
}

export default App;
