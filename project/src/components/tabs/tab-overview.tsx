import { memo } from 'react';
import { FilmsDescription } from '../../types/films';

type TabOverviewProps = {
  film: FilmsDescription
}

function TabOverview(props: TabOverviewProps): JSX.Element {
  const ratingLevel = defineRatingLevel(props.film.rating);

  function defineRatingLevel(rating: number) {
    if (0 < rating && rating < 3) { return 'Bad'; }
    if (3 < rating && rating < 5) { return 'Normal'; }
    if (5 < rating && rating < 8) { return 'Good'; }
    if (8 < rating && rating < 10) { return 'Very Good'; }
    if (rating === 10) { return 'Awesome'; }
    return 'Too good for grading';
  }


  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{props.film.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{ratingLevel}</span>
          <span className="film-rating__count">{props.film.scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{props.film.description}</p>

        <p className="film-card__director"><strong>Director: {props.film.director}</strong></p>

        <p
          className="film-card__starring"
        >
          <strong>
            Starring:
            {props.film.starring.join(', ')}
          </strong>
        </p>
      </div>
    </>
  );
}

export default memo(TabOverview);
