import Main from './../main/main';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignIn from '../signIn/sign-in';
import MyList from '../myList/my-list';
import Film from './../film/film';
import AddReview from '../addReview/add-review';
import Player from './../player/player';
import Page404 from '../404/page-404';
import PrivateRoute from '../private-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import { FilmsDescription } from '../../types/films';

type AppProps = {
  films: FilmsDescription[]
}

function App( {films} : AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Main} exact>
          <Main films={films}/>
        </Route>

        <Route path={AppRoute.SignIn} exact>
          <SignIn />
        </Route>

        <PrivateRoute
          path={AppRoute.MyList}
          exact
          render={() => <MyList films={films} />}
          autorizationStatus={AuthorizationStatus.Auth}
        >

        </PrivateRoute>

        <Route path={AppRoute.Film} exact>
          <Film films={films}/>
        </Route>

        <Route path={AppRoute.AddReview} exact>
          <AddReview films={films} />
        </Route>

        <Route path={AppRoute.Player} exact>
          <Player films={films}/>
        </Route>

        <Route exact>
          <Page404 />
        </Route>
      </Switch>
    </BrowserRouter>


  );
}

export default App;
