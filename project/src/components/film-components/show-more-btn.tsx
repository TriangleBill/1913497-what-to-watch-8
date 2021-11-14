import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilterFilms, getShownFilms } from './../../store/films-process/selector';
import { incrementShownFilms } from './../../store/action';


export default function ShowMoreBtn(): JSX.Element {
  const dispatch = useDispatch();
  const btnElement = useRef<HTMLButtonElement>(null);
  const cardElements = useSelector(getFilterFilms);
  const shownFilms = useSelector(getShownFilms);


  function onClick() {
    dispatch(incrementShownFilms());
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
