import { useState } from 'react';
import { useSelector } from 'react-redux';
import Card from './card';
import { getFilterFilms } from './../../store/films-process/selector';


export function FilmsList(): JSX.Element {
  const [activeFilm, setActiveFilm] = useState(0);
  const cardElements = useSelector(getFilterFilms);

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
