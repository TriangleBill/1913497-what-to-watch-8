import { memo } from 'react';
import { FilmsDescription } from '../../types/films';

type TabDetailsProps = {
  film: FilmsDescription
}

function TabDetails(props: TabDetailsProps): JSX.Element {
  const runTimeHour = Math.floor(props.film.runTime / 60);
  const runTimeMinutes = props.film.runTime % 60;
  const runTime = `${!(runTimeHour===0)? `${runTimeHour }h`: '' } ${runTimeMinutes}m`;


  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{props.film.director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">
            {props.film.starring.map((el) =><span key={el}>{el}<br/></span>)}
          </span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{runTime}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{props.film.genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{props.film.released}</span>
        </p>
      </div>
    </div>
  );
}

export default memo(TabDetails);
