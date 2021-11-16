import { memo } from 'react';
import { FilmReviews } from '../../types/films';

type TabReviewProps = {
  filmReviews: FilmReviews[]
}


function TabReviews({ filmReviews }: TabReviewProps): JSX.Element {

  function getCorrectDate (date: Date) {
    const monthName = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];

    const result = `${monthName[date.getMonth() - 1]} ${date.getDate()}, ${date.getFullYear()}`;

    return result;
  }

  if (!filmReviews || !filmReviews[0]) {
    return <h1>Reviews not found</h1>;
  }

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">

        {filmReviews.slice(0, 2).map((el) => (
          <div  key={String(el.user.id)+el.date} className="review">
            <blockquote className="review__quote">
              <p className="review__text">{el.comment}</p>

              <footer className="review__details">
                <cite className="review__author">{el.user.name}</cite>
                <time className="review__date" dateTime="2016-12-24">{getCorrectDate(el.date)}</time>
              </footer>
            </blockquote>

            <div className="review__rating">{el.rating}</div>
          </div>

        ))}
      </div>
      <div className="film-card__reviews-col">
        {filmReviews.slice(2, 4).map((el) => (
          <div key={String(el.user.id)+el.date} className="review">
            <blockquote className="review__quote">
              <p className="review__text">{el.comment}</p>

              <footer className="review__details">
                <cite className="review__author">{el.user.name}</cite>
                <time className="review__date" dateTime="2016-12-24">{getCorrectDate(el.date)}</time>
              </footer>
            </blockquote>

            <div className="review__rating">{el.rating}</div>
          </div>

        ))}
      </div>
    </div>
  );
}

export default memo(TabReviews);
