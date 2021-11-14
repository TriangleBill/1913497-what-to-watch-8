import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FilmsDescription } from '../../types/films';
import Card from './card';
import { getGenre } from './../../store/films-process/selector';
import { getFilms } from './../../store/films-data/selector';


type FilmsListProps = {
  shownFilms: number,
}

export function FilmsList({ shownFilms}: FilmsListProps): JSX.Element {
  const [activeFilm, setActiveFilm] = useState(0);
  const genre = useSelector(getGenre);
  const filmsList = useSelector(getFilms);
  const cardElements:FilmsDescription[] = [];


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

  function renderCards() {
    return (
      cardElements[0] ?
        cardElements.map((el, _id) => (
          <Card key={el.id} activeFilm={activeFilm} filmData={el} setActiveFilm={setActiveFilm} />
        ))
        :
        <h1>Films not found</h1>);
  }


  return (
    <>
      {renderCards()}
    </>
  );
}

export default FilmsList;
