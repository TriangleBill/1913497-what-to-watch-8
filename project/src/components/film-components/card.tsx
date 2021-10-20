import { MouseEventHandler, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { FilmsDescription } from '../../types/films';
import PreviewPlayer from './preview-player';
type cardProps = {
  filmData: FilmsDescription,
  mouseOver: (id:string) => void,
  activeFilm: string
}

export default function Card({ filmData, mouseOver, activeFilm }: cardProps): JSX.Element {
  const history = useHistory();


  function Push() {
    history.push(`/films/${filmData.id}`);
  }


  return (

    <article className="small-film-card catalog__films-card"  onClick={Push} onMouseOver={()=> {mouseOver(filmData.id)}} >

      <PreviewPlayer src={filmData.trailer} poster={filmData.poster} filmId={filmData.id} activeFilm={activeFilm}/>

      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${filmData.id}`} >{filmData.name}</Link>
      </h3>
    </article>

  );
}
