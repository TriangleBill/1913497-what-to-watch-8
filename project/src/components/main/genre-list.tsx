import { useDispatch, useSelector } from 'react-redux';
import { changeGenre, resetShownFilms } from './../../store/action';
import { memo } from 'react';
import { getGenre } from './../../store/films-process/selector';
import { getFilms } from './../../store/films-data/selector';


export function GenreList(): JSX.Element {
  const genre = useSelector(getGenre);
  const filmsList = useSelector(getFilms);
  const dispatch = useDispatch();
  const genres: string[] = [];

  filmsList.forEach((el, _id) => {
    if (!genres.includes(el.genre)) {
      genres.push(el.genre);
    }
  });

  function handleClick(value: string)  {
    dispatch(changeGenre(value));
    dispatch(resetShownFilms());
  }

  return (
    <ul className="catalog__genres-list">
      { ['All genres', ...genres].map((el, id) => (
        <li key={+id + genre} className={`catalog__genres-item ${genre === el ? 'catalog__genres-item--active' : ''}`}>
          <div onClick={() => handleClick(el)} style={{ cursor: 'pointer' }} className="catalog__genres-link">{el}</div>
        </li>
      ))}
    </ul>
  );
}


export default memo(GenreList);
