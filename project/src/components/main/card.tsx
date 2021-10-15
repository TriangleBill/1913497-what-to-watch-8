
import { useHistory } from 'react-router';
type cardProps = {
  filmName: string,
  previewImage: string,
  id: string;
}

export default function Card({ filmName, previewImage, id }: cardProps): JSX.Element {

  const history = useHistory();

  function Push() {
    history.push(`/films/${id}`);
  }

  return (

    <article className="small-film-card catalog__films-card" onClick={Push}>
      <div className="small-film-card__image">
        <img src={previewImage} alt={filmName} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href="film-page.html">{filmName}</a>
      </h3>
    </article>

  );
}
