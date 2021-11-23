import { useParams } from 'react-router';
import Page404 from '../404/page-404';
import AddReviewBtn from '../add-review/add-review-btn';
import Tabs from './../tabs/tabs';
import RelatedFilmsList from './related-films-list';
import User from '../user/user';
import Logo from '../logo/logo';
import FilmPoster from './film-poster';
import FilmTitle from './film-title';
import PlayBtn from '../player/player-btn';
import MylistBtn from '../my-list/mylist-btn';
import { useEffect, useState } from 'react';
import LoadingScreen from '../loading-screen/loading-screen';
import { useSelector, useDispatch } from 'react-redux';
import { getFilm } from '../../store/films-data/selector';
import { fetchFilmAction } from '../../store/api-actions';

export default function Film(): JSX.Element {
  const dispatch = useDispatch();
  const params = useParams<{ id?: string }>();
  const film = useSelector(getFilm);
  const [isPageExists, setIsPageExists] = useState(true);


  useEffect(() => {
    dispatch(fetchFilmAction(Number(params.id)));
  }, [params.id, dispatch]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsPageExists(false);
    }, 5000);
    return clearTimeout(timer);
  }, [isPageExists, params.id]);

  if (!film) {
    if (isPageExists) {
      return <Page404 />;
    }
    return <LoadingScreen />;
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

      <section className="film-card film-card--full" style={{ backgroundColor: `${film.backgroundColor}` }}>
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo />

            <User />
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <FilmTitle filmName={film.name} filmGenre={film.genre} released={film.released} />

              <div className="film-card__buttons">
                <PlayBtn filmId={film.id} />
                <MylistBtn film={film} />
                <AddReviewBtn id={film.id} />
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top" >
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <FilmPoster filmPoster={film.posterImage} filmName={film.name} />
            </div>

            <Tabs film={film} />
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>


          <div className="catalog__films-list">
            <RelatedFilmsList filmId={film.id} />
          </div>
        </section>

        <footer className="page-footer">
          <Logo isLight />

          <div className="copyright">
            <p>© 2021 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
