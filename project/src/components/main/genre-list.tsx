import { useDispatch, useSelector } from 'react-redux';
import { changeGenre } from './../../store/action';
import { memo } from 'react';
import { getGenre } from './../../store/films-process/selector';
import { getFilms } from './../../store/films-data/selector';


export function GenreList(): JSX.Element {
  const genre = useSelector(getGenre);
  const filmsList = useSelector(getFilms);
  const dispatch = useDispatch();
  const genres: string[] = [];

  filmsList.map((el, _id): void => {
    if (!genres.includes(el.genre)) {
      genres.push(el.genre);
    }
  });

  function onClick(e:any) {
    const data = e.target.innerText;
    dispatch(changeGenre(data));
  }

  return (
    <ul className="catalog__genres-list">
      <li className={`catalog__genres-item ${genre === 'All genres'? 'catalog__genres-item--active' : ''}`}>
        <div onClick={onClick} style={{ cursor: 'pointer' }} className="catalog__genres-link">All genres</div>
      </li>
      {genres.map((el, id) => (
        <li key={+id+Date.now()} className={`catalog__genres-item ${genre === el? 'catalog__genres-item--active' : ''}`}>
          <div onClick={onClick} style={{ cursor: 'pointer' }} className="catalog__genres-link">{el}</div>
        </li>
      ))}
    </ul>
  );
}


export default memo(GenreList);
