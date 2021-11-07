import { useSelector } from 'react-redux';
import { RouteProps, Route, Redirect } from 'react-router-dom';
import { AuthorizationStatus, AppRoute } from '../const';
import { getAuthorizationStatus } from './../store/user-process/selector';


type PrivateRouteProps = RouteProps & {
    render: () => JSX.Element;
}

export function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { exact, path, render } = props;
  const authorizationStatus = useSelector(getAuthorizationStatus);

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

export default PrivateRoute;
