import { FilmsDescription } from '../../types/films';

type TabOverviewProps = {
    film: FilmsDescription
}

export default function TabOverview(props:TabOverviewProps) {
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{props.film.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">Very good</span>
          <span className="film-rating__count">240 ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        {props.film.description}
      </div>
    </>
  );
}
