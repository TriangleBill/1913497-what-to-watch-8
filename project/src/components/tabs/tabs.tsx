import { useEffect, useState } from 'react';
import { FilmsDescription } from '../../types/films';
import TabsContent from './tabs-content';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviewsAction } from '../../store/api-actions';
import { getFilmReviews } from '../../store/films-data/selector';

type TabsProps = {
  film: FilmsDescription,
}

export default function Tabs(props: TabsProps): JSX.Element {
  const SERVER_ERROR_MASSAGEE = 'Sorry, the server is unavailable. Please try again later.';
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('Overview');
  const titles = ['Overview', 'Details', 'Reviews'] as const;
  const filmReviews = useSelector(getFilmReviews);
  useEffect(() => {
    dispatch(fetchReviewsAction(props.film.id));
  }, [props.film.id, dispatch]);


  function handleClick(e: React.FormEvent<HTMLDivElement>) {
    if (e.currentTarget !== null) { setActiveTab(e.currentTarget.innerText); }
  }

  if (!filmReviews) {
    return <h1>{SERVER_ERROR_MASSAGEE}</h1>;
  }

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {titles.map((el, index) => (
            <li key={+(index + Date.now())} className={`film-nav__item ${activeTab === el ? 'film-nav__item--active' : null}`}>
              <div style={{ cursor: 'pointer' }} className="film-nav__link" onClick={handleClick}>{el}</div>
            </li>
          ))}


        </ul>
      </nav>

      <TabsContent filmReviews={filmReviews} film={props.film} activeTab={activeTab} />

    </div>
  );
}
