import { memo } from 'react';

type FilmTitleProps = {
    filmName: string,
    filmGenre: string,
    released: string
}

function FilmTitle(props: FilmTitleProps) {
  return (
    <>
      <h2 className="film-card__title">{props.filmName}</h2>
      <p className="film-card__meta">
        <span className="film-card__genre">{props.filmGenre}</span>
        <span className="film-card__year">{props.released}</span>
      </p>
    </>
  );
}

export default memo(FilmTitle);
