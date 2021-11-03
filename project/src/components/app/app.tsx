import Main from './../main/main';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignIn from '../sign-in/sign-in';
import MyList from '../my-list/my-list';
import Film from './../film/film';
import AddReview from '../add-review/add-review';
import Player from './../player/player';
import Page404 from '../404/page-404';
import PrivateRoute from '../private-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import { connect, ConnectedProps } from 'react-redux';
import { State } from '../../types/state';
import LoadingScreen from '../loading-screen';

const mapStateToProps = ({ genre, filmsList, isLoadData }: State) => ({
  genre,
  filmsList,
  isLoadData,
});


const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

function App( props: PropsFromRedux): JSX.Element {
  if (props.isLoadData) {
    return <LoadingScreen />;
  }
  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Main} exact>
          <Main films={props.filmsList}/>
        </Route>

        <Route path={AppRoute.SignIn} exact>
          <SignIn />
        </Route>

        <PrivateRoute
          path={AppRoute.MyList}
          exact
          render={() => <MyList films={props.filmsList} />}
          autorizationStatus={AuthorizationStatus.Auth}
        >

        </PrivateRoute>

        <Route path={AppRoute.Film} exact>
          <Film films={props.filmsList}/>
        </Route>

        <Route path={AppRoute.AddReview} exact>
          <AddReview films={props.filmsList} />
        </Route>

        <Route path={AppRoute.Player} exact>
          <Player films={props.filmsList}/>
        </Route>

        <Route exact>
          <Page404 />
        </Route>
      </Switch>
    </BrowserRouter>


  );
}


export default connector(App);
