import { Link } from 'react-router-dom';
import { FilmsDescription } from '../../types/films';
import { useParams } from 'react-router';
import Page404 from '../404/page-404';
import FormReview from './form-review';
import User from '../header/user';
import Logo from './../header/logo';
import FilmPoster from '../header/film-poster';

type AddReviewProps = {
  films: FilmsDescription[]
}


export default function AddReview({ films }: AddReviewProps): JSX.Element {
  const params = useParams<{ id?: string }>();
  const reviewFilm = films.find((el) => String(el.id) === params.id);


  if (!reviewFilm) {
    return <Page404 />;
  }

  return (
    <>
      <div className="visually-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <symbol id="add" viewBox="0 0 19 20">

            <title>+</title>
            <desc>Created with Sketch.</desc>
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <polygon id="+" fill="#EEE5B5" points="10.777832 11.2880859 10.777832 19.5527344 8.41650391 19.5527344 8.41650391 11.2880859 0.627929688 11.2880859 0.627929688 8.92675781 8.41650391 8.92675781 8.41650391 0.662109375 10.777832 0.662109375 10.777832 8.92675781 18.5664062 8.92675781 18.5664062 11.2880859" />
            </g>
          </symbol>
          <symbol id="full-screen" viewBox="0 0 27 27">
            <path fillRule="evenodd" clipRule="evenodd" d="M23.8571 0H16V3.14286H23.8571V11H27V3.14286V0H23.8571Z" fill="#FFF9D9" fillOpacity="0.7" />
            <path fillRule="evenodd" clipRule="evenodd" d="M27 23.8571V16H23.8571V23.8571H16V27H23.8571H27L27 23.8571Z" fill="#FFF9D9" fillOpacity="0.7" />
            <path fillRule="evenodd" clipRule="evenodd" d="M0 3.14286L0 11H3.14286L3.14286 3.14286L11 3.14286V0H3.14286H0L0 3.14286Z" fill="#FFF9D9" fillOpacity="0.7" />
            <path fillRule="evenodd" clipRule="evenodd" d="M3.14286 27H11V23.8571H3.14286L3.14286 16H0L0 23.8571V27H3.14286Z" fill="#FFF9D9" fillOpacity="0.7" />
          </symbol>
          <symbol id="in-list" viewBox="0 0 18 14">
            <path fillRule="evenodd" clipRule="evenodd" d="M2.40513 5.35353L6.1818 8.90902L15.5807 0L18 2.80485L6.18935 14L0 8.17346L2.40513 5.35353Z" fill="#EEE5B5" />
          </symbol>
          <symbol id="pause" viewBox="0 0 14 21">
            <title>Artboard</title>
            <desc>Created with Sketch.</desc>
            <g id="Artboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <polygon id="Line" fill="#EEE5B5" fillRule="nonzero" points="0 -1.11910481e-13 4 -1.11910481e-13 4 21 0 21" />
              <polygon id="Line" fill="#EEE5B5" fillRule="nonzero" points="10 -1.11910481e-13 14 -1.11910481e-13 14 21 10 21" />
            </g>
          </symbol>
        </svg>
      </div>

      <section className="film-card film-card--full" style={{backgroundColor: reviewFilm.backgroundColor}}>
        <div className="film-card__header">
          <div className="film-card__bg">
            <img src={reviewFilm.backgroundImage} alt={reviewFilm.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <Logo />

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link to={`/films/${reviewFilm.id}`} className="breadcrumbs__link">{reviewFilm.name}</Link>
                </li>
                <li className="breadcrumbs__item">
                  <div  className="breadcrumbs__link">Add review</div>
                </li>
              </ul>
            </nav>

            <User/>
          </header>

          <div className="film-card__poster film-card__poster--small">
            <FilmPoster filmName={reviewFilm.name} filmPoster={reviewFilm.posterImage}/>
            {/* <img src={reviewFilm.posterImage} alt={reviewFilm.name} width="218" height="327" /> */}
          </div>
        </div>

        <div className="add-review" >
          <FormReview reviewFilm={reviewFilm}/>
        </div>

      </section>
    </>
  );
}
