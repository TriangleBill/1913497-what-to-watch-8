import { useState } from 'react';
import { FilmsDescription } from '../../types/films';
import Card from './card';

type FilmsListProps = {
  films: FilmsDescription[];
}

export default function FilmsList({ films }: FilmsListProps): JSX.Element {
  const [activeFilm, setActiveFilm] = useState('');
  let timeoutId: ReturnType<typeof setTimeout>;

  function mouseOver (id:string) {
    setActiveFilm(id);
  }

  function playPreview (e: any) {
    if (e) {
      timeoutId = setTimeout(()=> {
        e.target.play();
      }, 1000);

    }
  }

  function stopPreview(e:any) {
    const vid = e.target;
    if (e !== null) {
      vid.pause();
      vid.currentTime = 0;
      vid.load();
    }

    clearTimeout(timeoutId);
  }


  return (
    <>
      {films.map((film, id) => (
        <Card key={film.id} stopPreview={stopPreview}  playPreview={playPreview} filmData={film} mouseOver={()=>{mouseOver(film.id);}}/>
      ))}
    </>
  );
}
