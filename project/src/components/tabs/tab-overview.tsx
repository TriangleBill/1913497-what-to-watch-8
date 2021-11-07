import { memo } from 'react';
import { FilmsDescription } from '../../types/films';

type TabOverviewProps = {
    film: FilmsDescription
}

function TabOverview(props:TabOverviewProps): JSX.Element {
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{props.film.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">Very good</span>
          <span className="film-rating__count">{props.film.scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        {props.film.description}
      </div>
    </>
  );
}

export default memo(TabOverview)