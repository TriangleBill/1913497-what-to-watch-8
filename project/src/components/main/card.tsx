import { MouseEventHandler, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { FilmsDescription } from '../../types/films';
import PreviewPlayer from '../player/preview-player';
type cardProps = {
  filmData: FilmsDescription,
  mouseOver: MouseEventHandler,
  stopPreview: MouseEventHandler,
  playPreview: MouseEventHandler
}

export default function Card({ filmData, mouseOver, stopPreview, playPreview }: cardProps): JSX.Element {
  const[isActive, setIsActive] = useState(false);
  const history = useHistory();

  function Push() {
    history.push(`/films/${filmData.id}`);
  }


  return (

    <article className="small-film-card catalog__films-card"  onClick={Push} onMouseOver={mouseOver} >

      <PreviewPlayer src={filmData.trailer} poster={filmData.poster} stopPreview={stopPreview} playPreview={playPreview} cardIsActive={isActive} setActiveCard={setIsActive} />

      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${filmData.id}`} >{filmData.name}</Link>
      </h3>
    </article>

  );
}
