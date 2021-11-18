import Main from './../main/main';
import { Switch, Route } from 'react-router-dom';
import SignIn from '../sign-in/sign-in';
import MyList from '../my-list/my-list';
import Film from './../film/film';
import AddReview from '../add-review/add-review';
import Player from './../player/player';
import Page404 from '../404/page-404';
import PrivateRoute from '../private-route';
import { AppRoute } from '../../const';
import { useSelector } from 'react-redux';
import LoadingScreen from '../loading-screen';
import { getLoadedDataStatus } from '../../store/films-data/selector';
import { getFilms } from './../../store/films-data/selector';


function App(): JSX.Element {
  const isLoadData = useSelector(getLoadedDataStatus);
  const filmsList = useSelector(getFilms);

  if (isLoadData) {
    return <LoadingScreen />;
  }
  return (
    <Switch>
      <Route path={AppRoute.Main} exact>
        <Main />
      </Route>

      <Route path={AppRoute.SignIn} exact>
        <SignIn />
      </Route>

      <PrivateRoute
        path={AppRoute.MyList}
        exact
        render={() => <MyList films={filmsList} />}
      >
      </PrivateRoute>

      <Route path={AppRoute.Film} exact>
        <Film />
      </Route>

      <PrivateRoute
        path={AppRoute.AddReview}
        exact
        render={() => <AddReview films={filmsList} />}
      >

      </PrivateRoute>

      <Route path={AppRoute.Player} exact>
        <Player films={filmsList}/>
      </Route>

      <Route exact>
        <Page404 />
      </Route>
    </Switch>


  );
}


export default App;
