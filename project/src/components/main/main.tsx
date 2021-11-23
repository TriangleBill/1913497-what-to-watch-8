import FilmsList from '../film/films-list';
import GenreList from './genre-list';
import User from '../user/user';
import Logo from '../logo/logo';
import FilmPoster from '../film//film-poster';
import PlayBtn from '../player/player-btn';
import MylistBtn from '../my-list//mylist-btn';
import FilmTitle from '../film//film-title';
import ShowMoreBtn from '../film/show-more-btn';
import { useDispatch, useSelector } from 'react-redux';
import { resetShownFilms } from '../../store/action';
import { getPromoFilm } from './../../store/films-data/selector';
import { getFilterFilms } from '../../store/films-process/selector';
import { useEffect } from 'react';
import Loading from './../loading-screen/loading';


export default function Main(): JSX.Element {
  const promoFilm = useSelector(getPromoFilm);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetShownFilms());
  }, [dispatch]);


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
            <symbol id="play-s" viewBox="0 0 19 19">
              <path fillRule="evenodd" clipRule="evenodd" d="M0 0L19 9.5L0 19V0Z" fill="#EEE5B5" />
            </symbol>
            <title>Artboard</title>
            <desc>Created with Sketch.</desc>
            <g id="Artboard" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <polygon id="Line" fill="#EEE5B5" fillRule="nonzero" points="0 -1.11910481e-13 4 -1.11910481e-13 4 21 0 21" />
              <polygon id="Line" fill="#EEE5B5" fillRule="nonzero" points="10 -1.11910481e-13 14 -1.11910481e-13 14 21 10 21" />
            </g>
          </symbol>
        </svg>
      </div>

      <section className="film-card">
        {!promoFilm ?
          <Loading />
          :
          <div className="film-card__bg">
            <img src={promoFilm.backgroundImage} alt={promoFilm.name} />
          </div>}


        <h1 className="visually-hidden">WTW</h1>


        <header className="page-header film-card__head">
          <Logo />

          <User />
        </header>

        {!promoFilm ?
          <Loading />
          :
          <div className="film-card__wrap">
            <div className="film-card__info">
              <div className="film-card__poster">
                <FilmPoster filmName={promoFilm.name} filmPoster={promoFilm.posterImage} />
              </div>

              <div className="film-card__desc">
                <FilmTitle filmName={promoFilm.name} filmGenre={promoFilm.genre} released={promoFilm.released} />

                <div className="film-card__buttons">
                  <PlayBtn filmId={promoFilm.id} />
                  <MylistBtn film={promoFilm} />
                </div>
              </div>
            </div>
          </div>}


      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenreList />

          <div className="catalog__films-list">
            <FilmsList selector={getFilterFilms} />
          </div>

          <ShowMoreBtn />
        </section>

        <footer className="page-footer">
          <div className="logo">
            <Logo isLight />
          </div>

          <div className="copyright">
            <p>© 2021 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

