import { useState } from 'react';
import { FilmsDescription } from '../../types/films';
import Card from './card';

type RelatedFilmsListProps = {
    films: FilmsDescription[],
    filmGenre: string,
    filmId: number
}

export default function RelatedFilmsList(props: RelatedFilmsListProps): JSX.Element {
  const [activeFilm, setActiveFilm] = useState(0);
  const cardElement:FilmsDescription[] = [];

  for (let i = 0; i < props.films.length; i++) {
    if (findRelatedFilms(props.films[i].genre, props.filmGenre) && props.filmId !== props.films[i].id && cardElement.length < 4) {
      cardElement.push(props.films[i]);
    }
  }


  function findRelatedFilms(filmsList:string, filmGenre: string) {
    for (let i = 0; i < filmGenre.length; i++) {
      if (filmsList.includes(filmGenre[i])) {
        return true;
      }
    }
  }

  function renderComponent() {
    if (cardElement[0]) {
      return cardElement.map((el, _id) => (
        <Card key={el?.id} activeFilm={activeFilm} filmData={el} setActiveFilm={setActiveFilm} />
      ));
    } else {
      return <h1>Related films not found</h1>;
    }

  }


  return (
    <>
      {renderComponent()}
    </>
  );
}
