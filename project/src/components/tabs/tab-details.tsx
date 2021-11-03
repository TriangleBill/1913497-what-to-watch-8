import { FilmsDescription } from '../../types/films';

type TabDetailsProps = {
  film: FilmsDescription
}

export default function TabDetails(props: TabDetailsProps): JSX.Element {
  const runTimeHour = Math.floor(props.film.runTime / 60);
  const runTimeMinutes = props.film.runTime % 60;


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
            {props.film.starring.map((el) =><>{el}<br/></>)}
          </span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{!(runTimeHour===0)? `${runTimeHour }h`: '' } {runTimeMinutes} m</span>
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
