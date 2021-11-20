import { memo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AuthorizationStatus } from '../../const';
import { getFavoriteFilms } from '../../store/films-data/selector';
import { FilmsDescription } from '../../types/films';
import { getAuthorizationStatus } from './../../store/user-process/selector';
import { useHistory } from 'react-router';
import { api } from './../../store/store';

type MylistBtnProps = {
  film: FilmsDescription
}

function MylistBtn({ film }: MylistBtnProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const favoriteFilms = useSelector(getFavoriteFilms);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const history = useHistory();

  useEffect(() => {
    const filmIsFavorite = !!favoriteFilms.filter((el) => el.id === film.id)[0];
    setIsFavorite(filmIsFavorite);
    if (authorizationStatus !== AuthorizationStatus.Auth) { setIsFavorite(false); }
  }, [favoriteFilms, film, authorizationStatus]);

  function addInFavorite() {
    if (authorizationStatus !== AuthorizationStatus.Auth) { history.push('/login'); }
    else { api.post(`/favorite/${film.id}/1`, film).then(() => setIsFavorite(true)); }
  }

  function removeInFavorite() {
    if (authorizationStatus !== AuthorizationStatus.Auth) { history.push('/login'); }
    else { api.post(`/favorite/${film.id}/0`, film).then(() => setIsFavorite(false)); }
  }

  function renderComponent() {
    if (isFavorite) {
      return (
        <button onClick={removeInFavorite} className="btn btn--list film-card__button" type="button">
          <svg viewBox="0 0 19 20" width="19" height="20">
            <use xlinkHref="#in-list"></use>
          </svg>

          <span>My list</span>
        </button>
      );
    } else {
      return (
        <button onClick={addInFavorite} className="btn btn--list film-card__button" type="button">
          <svg viewBox="0 0 19 20" width="19" height="20">
            <use xlinkHref="#add"></use>
          </svg>

          <span>My list</span>
        </button>
      );
    }
  }

  return (
    renderComponent()
  );
}

export default memo(MylistBtn);
