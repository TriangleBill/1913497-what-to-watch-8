import { FilmsDescription } from '../../types/films';
import Card from './card';

type FilmsListProps = {
    films: FilmsDescription[];
}

export default function FilmsList({films}: FilmsListProps): JSX.Element {

  return (
    <>
      {films.map((film, id) => (
        <Card key={film.id} filmName={film.name} previewImage={film.poster} id={film.id}/>
      ))}
    </>
  );
}
