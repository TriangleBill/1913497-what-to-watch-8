import { useState } from 'react';
import { FilmsDescription } from '../../types/films';
import Card from './card';

type RelatedFilmsListProps = {
    films: FilmsDescription[],
    filmGenre: string[],
    filmId: string
}

export default function RelatedFilmsList(props: RelatedFilmsListProps): JSX.Element {
  const [activeFilm, setActiveFilm] = useState('');
  const cardElement = [];

  for (let i = 0; i < props.films.length; i++) {
    if (findRelatedFilms(props.films[i].genre, props.filmGenre) && props.filmId !== props.films[i].id && cardElement.length < 4) {
      cardElement.push(props.films[i]);
    }
  }

  // props.films[i].genre.includes(props.filmGenre[0])

  function findRelatedFilms(filmsList:string[], filmGenre: string[] ) {
    for (let i = 0; i < filmGenre.length; i++) {
      if (filmsList.includes(filmGenre[i])) {
        return true;
      }
    }
  }


  return (
    <>
      {/* {console.log(cardElement)} */}
      {cardElement[0] ?
        cardElement.map((el, id) => (
          <Card key={el?.id} activeFilm={activeFilm} filmData={el} setActiveFilm={setActiveFilm} />
        ))
        :
        <h1>Related films not found</h1>}
    </>
  );
}
