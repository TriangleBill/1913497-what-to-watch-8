import { Dispatch, SetStateAction, useRef } from 'react';
import { useSelector } from 'react-redux';
import { FilmsDescription } from '../../types/films';
import { getFilms } from './../../store/films-data/selector';
import { getGenre } from './../../store/films-process/selector';

type ShowMoreBtnProps = {
    setShownFilms: Dispatch<SetStateAction<number>>,
    shownFilms: number,
}

export default function ShowMoreBtn({ setShownFilms, shownFilms }: ShowMoreBtnProps): JSX.Element {
  const filmsList = useSelector(getFilms);
  const btnElement = useRef<HTMLButtonElement>(null);
  const cardElements:FilmsDescription[] = [];
  const genre = useSelector(getGenre);

  for (let i = 0; i < filmsList.length; i++) {
    if ((findFilms(filmsList[i].genre, genre)) && (cardElements.length < shownFilms)) {
      cardElements.push(filmsList[i]);
    }
  }

  function findFilms(film: string, filmGenre: string) {
    if (film.includes(filmGenre) || filmGenre === 'All genres') {
      return true;
    }
  }

  function onClick() {
    setShownFilms(shownFilms + 8);
  }

  if  (btnElement.current !== null) {
    if (isBtnHide()) {btnElement.current.style.visibility = 'hidden';}
    else  {btnElement.current.style.visibility = 'visible';}

  }

  function isBtnHide() {
    if (cardElements.length < shownFilms) {
      return true;
    } else {return false;}
  }

  return (
    <div className="catalog__more">
      <button ref={btnElement} className="catalog__button" type="button" onClick={onClick}>Show more</button>
    </div>
  );
}
