import { useState } from 'react';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import { FilmsDescription } from '../../types/films';
import { State } from '../../types/state';
import Card from './card';
import { getGenre } from './../../store/films-process/selector';
import { getFilms } from './../../store/films-data/selector';

export function FilmsList(): JSX.Element {
  const [activeFilm, setActiveFilm] = useState(0);

  const genre = useSelector(getGenre)
  const  filmsList = useSelector(getFilms)

  const cardElement: FilmsDescription[] = [];


  for (let i = 0; i < filmsList.length; i++) {
    if (findFilms(filmsList[i].genre, genre) && cardElement.length < 8) {
      cardElement.push(filmsList[i]);
    }
  }


  function findFilms(filmsList: string, genre: string) {
    if (filmsList.includes(genre) || genre === 'All genres') {
      return true;
    }
  }

  function renderCards() {
    return (
      cardElement[0] ?
        cardElement.map((el, _id) => (
          <Card key={el?.id} activeFilm={activeFilm} filmData={el} setActiveFilm={setActiveFilm} />
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
