import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { logoutAction } from '../../store/api-actions';
import { ThunkAppDispatch } from '../../types/action';
import { State } from '../../types/state';
import { useHistory } from 'react-router';
import { memo } from 'react';

const mapStateToProps = ({ authorizationStatus }: State) => ({
  authorizationStatus,
});

const mapStateToDispatch = (dispatch: ThunkAppDispatch) => ({
  logout() {
    dispatch(logoutAction());
  },
});


const connector = connect(mapStateToProps, mapStateToDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

function User(props: PropsFromRedux): JSX.Element {
  const {logout} = props;
  const history = useHistory();

  function onClick() {
    logout();
    history.push(AppRoute.Main);
  }

  if (props.authorizationStatus === AuthorizationStatus.Auth) {
    return (
      <ul className="user-block">
        <li className="user-block__item">
          <div className="user-block__avatar">
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
          </div>
        </li>
        <li className="user-block__item">
          <div className="user-block__link" onClick={onClick}>Sign out</div>
        </li>
      </ul>
    );
  }

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <Link to={AppRoute.SignIn} className="user-block__link">Sign in</Link>
      </li>
    </ul>

  );
}

export default memo(connector(User));
