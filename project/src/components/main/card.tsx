import { MouseEventHandler } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
type cardProps = {
  filmName: string,
  previewImage: string,
  id: string,
  mouseOver: MouseEventHandler
}

export default function Card({ filmName, previewImage, id, mouseOver }: cardProps): JSX.Element {

  const history = useHistory();

  function Push() {
    history.push(`/films/${id}`);
  }


  return (

    <article className="small-film-card catalog__films-card"  onClick={Push} onMouseOver={mouseOver} >
      <div className="small-film-card__image">
        <img src={previewImage} alt={filmName} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${id}`} >{filmName}</Link>
      </h3>
    </article>

  );
}
