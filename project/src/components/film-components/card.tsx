import { MouseEventHandler, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { setTimeout } from 'timers';
import { FilmsDescription } from '../../types/films';
import PreviewPlayer from './preview-player';
type cardProps = {
  filmData: FilmsDescription,
  setActiveFilm: Function,
  activeFilm: string
}

export default function Card({ filmData, setActiveFilm, activeFilm }: cardProps): JSX.Element {
  const history = useHistory();

  let timeoutID: ReturnType<typeof setTimeout>

  function mouseOver(setActiveFilm: Function) {
    timeoutID = setTimeout(() => {
      setActiveFilm(filmData.id)
    }, 1000)

  }


  function mouseOut(setActiveFilm: Function) {
    clearTimeout(timeoutID)
    setActiveFilm('')
  }

  function Push() {
    history.push(`/films/${filmData.id}`);
  }


  return (

    <article className="small-film-card catalog__films-card" onClick={Push} onMouseOver={() => mouseOver(setActiveFilm)} onMouseLeave={() => mouseOut(setActiveFilm)} >

      <PreviewPlayer src={filmData.trailer} poster={filmData.poster} filmId={filmData.id} activeFilm={activeFilm} />

      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${filmData.id}`} >{filmData.name}</Link>
      </h3>
    </article>

  );
}
