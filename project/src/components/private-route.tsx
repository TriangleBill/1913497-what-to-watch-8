import { RouteProps, Route, Redirect } from 'react-router-dom';
import { AuthorizationStatus, AppRoute } from '../const';


type PrivateRouteProps = RouteProps & {
    render: () => JSX.Element;
    autorizationStatus:  AuthorizationStatus;
}

export default function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { exact, path, render, autorizationStatus } = props;

  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        autorizationStatus === AuthorizationStatus.Auth
          ? render()
          : <Redirect to={AppRoute.SignIn} />
      )}
    />

  );
}
