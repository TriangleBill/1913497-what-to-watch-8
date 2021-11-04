import { connect, ConnectedProps } from 'react-redux';
import { RouteProps, Route, Redirect } from 'react-router-dom';
import { AuthorizationStatus, AppRoute } from '../const';
import { State } from '../types/state';


type PrivateRouteProps = RouteProps & {
    render: () => JSX.Element;
}

const mapStateToProps = ({ authorizationStatus }: State) => ({
  authorizationStatus,
});


const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>
type ConnectedComponentProps = PropsFromRedux & PrivateRouteProps;

export function PrivateRoute(props: ConnectedComponentProps): JSX.Element {
  const { exact, path, render, authorizationStatus } = props;

  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        authorizationStatus === AuthorizationStatus.Auth
          ? render()
          : <Redirect to={AppRoute.SignIn} />
      )}
    />

  );
}

export default connector(PrivateRoute);
