import { memo } from 'react';
import { useHistory } from 'react-router';

type PlayBtnProps = {
  filmId: number
}

function PlayBtn({filmId}: PlayBtnProps): JSX.Element {
  const histtory = useHistory();

  function onClick() {
    histtory.push(`/player/${filmId}`);
  }

  return (
    <button onClick={onClick} className="btn btn--play film-card__button" type="button">
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </button>
  );
}

export default memo(PlayBtn);
