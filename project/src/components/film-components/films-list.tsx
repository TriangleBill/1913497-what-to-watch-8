import { useState } from 'react';
import { useSelector } from 'react-redux';
import Card from './card';
import { FilmsDescription } from '../../types/films';
import { State } from '../../types/state';


type FilmsListProps = {
  selector:(state: State) => FilmsDescription[]
}

export function FilmsList({selector}: FilmsListProps): JSX.Element {
  const [activeFilm, setActiveFilm] = useState(0);
  const cardElements = useSelector(selector);


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
