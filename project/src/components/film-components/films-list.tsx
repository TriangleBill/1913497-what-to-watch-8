import { useState } from 'react';
import { useSelector } from 'react-redux';
import Card from './card';
import { FilmsDescription } from '../../types/films';
import { State } from '../../types/state';
import { getFavoriteFilms } from '../../store/films-data/selector';


type FilmsListProps = {
  selector:(state: State) => FilmsDescription[]
}

export function FilmsList({selector}: FilmsListProps): JSX.Element {
  const [activeFilm, setActiveFilm] = useState(0);
  const cardElements = useSelector(selector);


  function renderCards() {
    if (selector === getFavoriteFilms && !cardElements[0]) {
      return  <h1>You don&apos;t have any favorite movies</h1>;
    } else {return(
      cardElements[0] ?
        cardElements.map((el, _id) => (
          <Card key={el.id} activeFilm={activeFilm} filmData={el} setActiveFilm={setActiveFilm} />
        ))
        :
        <h1>Sorry, the server is unavailable. Please try again later.</h1>
    );}
  }


  return (
    <>
      {renderCards()}
    </>
  );
}

export default FilmsList;
