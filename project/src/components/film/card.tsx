import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { FilmsDescription } from '../../types/films';
import PreviewPlayer from './preview-player';
type cardProps = {
  filmData: FilmsDescription,
  setActiveFilm:setActiveFilm,
  activeFilm: number
}

type setActiveFilm =  (value: number) => void


export default function Card({ filmData, setActiveFilm, activeFilm }: cardProps): JSX.Element {
  const history = useHistory();

  let timeoutID: number | null = null;


  function mouseOut() {
    if (timeoutID) {window.clearTimeout(timeoutID);}
    setActiveFilm(0);
  }

  function mouseOver() {
    timeoutID = window.setTimeout(() => {
      setActiveFilm(filmData.id);
    }, 1000);
  }


  function Push() {
    history.push(`/films/${filmData.id}`);
  }


  return (

    <article className="small-film-card catalog__films-card" onClick={Push} onMouseOver={() => mouseOver()} onMouseLeave={() => mouseOut()} >

      <PreviewPlayer src={filmData.previewVideoLink} poster={filmData.previewImage} filmId={filmData.id} activeFilm={activeFilm} />

      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${filmData.id}`} >{filmData.name}</Link>
      </h3>
    </article>

  );
}
