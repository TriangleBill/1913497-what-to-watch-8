import { useDispatch, useSelector } from 'react-redux';
import { getFilterFilms, getShownFilms } from '../../store/films-process/selector';
import { incrementShownFilms } from '../../store/action';


export default function ShowMoreBtn(): JSX.Element {
  const dispatch = useDispatch();
  const cardElements = useSelector(getFilterFilms);
  const shownFilms = useSelector(getShownFilms);


  function onClick() {
    dispatch(incrementShownFilms());
  }

  if (cardElements.length < shownFilms) {
    return <div />;
  }

  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={onClick}>Show more</button>
    </div>
  );
}
