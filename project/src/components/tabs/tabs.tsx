import { useEffect, useRef, useState } from 'react';
import { FilmReviews, FilmsDescription } from '../../types/films';
import TabsContent from './tabs-content';
import { api } from './../../index';
import LoadingScreen from './../loading-screen';

type TabsProps = {
  film: FilmsDescription,
}

export default function Tabs(props: TabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState('Overview');
  const titles = ['Overview', 'Details', 'Reviews'];
  const tabRef = useRef<HTMLDivElement>(null);
  const [filmReviews, setFilmReviews] = useState<FilmReviews[]>();
  useEffect(() => {
    api.get(`/comments/${+props.film.id}`).then((resp) => {
      resp.data.map((el: FilmReviews) => el.date = new Date(el.date));
      setFilmReviews(resp.data);
      setFilmReviews((prevState) => prevState?.slice(0, 4));
    });
  }, [props.film.id]);


  function onClick(e: React.FormEvent<HTMLDivElement>) {
    if (e.currentTarget !== null) { setActiveTab(e.currentTarget.innerText); }
  }

  if (!filmReviews) {
    return <LoadingScreen />;
  }

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {titles.map((el, index) => (
            <li key={+(index + Date.now())} className={`film-nav__item ${activeTab === el ? 'film-nav__item--active' : null}`}>
              <div ref={tabRef} style={{ cursor: 'pointer' }} className="film-nav__link" onClick={onClick}>{el}</div>
            </li>
          ))}


        </ul>
      </nav>

      <TabsContent filmReviews={filmReviews} film={props.film} activeTab={activeTab} />

    </div>
  );
}
