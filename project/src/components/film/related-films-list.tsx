import { useState, useEffect } from 'react';
import Card from './card';
import { useSelector, useDispatch } from 'react-redux';
import { getSimilarFilms } from '../../store/films-data/selector';
import { fetchSimilarFilmsAction } from '../../store/api-actions';

type RelatedFilmsListProps = {
  filmId: number
}

export default function RelatedFilmsList({ filmId }: RelatedFilmsListProps): JSX.Element {
  const SHOWN_FILMS_NUMBER = 4;
  const FILMS_NOT_FOUND_MASSAGE = 'Related films not found';
  const [activeFilm, setActiveFilm] = useState(0);
  const similarFilms = useSelector(getSimilarFilms);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSimilarFilmsAction(filmId));
  }, [dispatch, filmId]);

  function renderComponent() {
    if (similarFilms[0]) {
      const filteredSimilarFilms = similarFilms
        .filter((el) => el.id !== filmId)
        .slice(0, SHOWN_FILMS_NUMBER);
      return filteredSimilarFilms.map((el) => <Card key={el?.id} activeFilm={activeFilm} filmData={el} setActiveFilm={setActiveFilm} />);
    } else {
      return <h1>{FILMS_NOT_FOUND_MASSAGE}</h1>;
    }
  }


  return (
    <>
      {renderComponent()}
    </>
  );
}
