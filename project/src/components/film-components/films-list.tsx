import { useState } from 'react';
import { FilmsDescription } from '../../types/films';
import Card from './card';

type FilmsListProps = {
  films: FilmsDescription[];
}

export default function FilmsList({ films }: FilmsListProps): JSX.Element {
  const [activeFilm, setActiveFilm] = useState('');


  function mouseOver(id: string) {
    setActiveFilm(id);
  }

  


  return (
    <>
      {films.map((film, id) => (
        <Card key={film.id} activeFilm={activeFilm} filmData={film} mouseOver={mouseOver} />
      ))}
    </>
  );
}
