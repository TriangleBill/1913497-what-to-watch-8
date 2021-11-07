import { connect, ConnectedProps, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { logoutAction } from '../../store/api-actions';
import { useHistory } from 'react-router';
import { memo } from 'react';
import { getAuthorizationStatus } from './../../store/user-process/selector';

function User(): JSX.Element {
  const history = useHistory();
  const authorizationStatus = useSelector(getAuthorizationStatus)
  const dispatch = useDispatch()

  function onClick() {
    dispatch(logoutAction())
    history.push(AppRoute.Main);
  }

  if (authorizationStatus === AuthorizationStatus.Auth) {
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

export default memo(User);
