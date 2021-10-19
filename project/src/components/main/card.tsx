import { MouseEventHandler } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { FilmsDescription } from '../../types/films';
import PreviewPlayer from './../player/previewPlayer';
type cardProps = {
  filmData: FilmsDescription,
  mouseOver: MouseEventHandler
}

export default function Card({ filmData, mouseOver }: cardProps): JSX.Element {

  const history = useHistory();

  function Push() {
    history.push(`/films/${filmData.id}`);
  }


  return (

    <article className="small-film-card catalog__films-card"  onClick={Push} onMouseOver={mouseOver} >

      <PreviewPlayer src={filmData.trailer} poster={filmData.poster}/>

      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${filmData.id}`} >{filmData.name}</Link>
      </h3>
    </article>

  );
}
