import { useRef, useState } from 'react';
import { FilmsDescription } from '../../types/films';
import { useHistory } from 'react-router';
import { api } from './../../index';
import { toast, ToastContainer } from 'react-toastify';

type FormReviewProps = {
  reviewFilm: FilmsDescription
}

export default function FormReview({ reviewFilm }: FormReviewProps): JSX.Element {
  const history = useHistory();
  const [starRating, setStarRating] = useState(0);
  const [textReview, setTextReview] = useState('');
  const textReviewValue = useRef<HTMLTextAreaElement>(null);

  const postReviewData = {
    rating: starRating,
    comment: textReview,
  };


  function hexToRgba(hex: string) {
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `${r}, ${g}, ${b}, ${0.2}`;
  }


  function handleChangeStar(e: any) {
    setStarRating(Number(e.target.value));

  }

  function handleChangeText() {
    if (null !== textReviewValue.current) {
      setTextReview(textReviewValue.current.value);
    }
  }

  function handleSubmit() {
    if (textReviewValue.current !== null && textReviewValue.current.value.length > 49 && textReviewValue.current.value.length < 401) {
      api.post(`/comments/${Number(reviewFilm.id)}`, postReviewData).then(() => history.push(`/films/${reviewFilm.id}`));
    } else {toast.info('Review text must be at least 50 and no more than 400 characters.');}

  }

  return (
    <form action="" className="add-review__form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <ToastContainer />
      <div className="rating">
        <div className="rating__stars">

          <input className="rating__input" id={'star-10'} type="radio" name="rating" value='10' onChange={handleChangeStar} />
          <label className="rating__label" htmlFor={'star-10'}>Rating 10</label>

          <input className="rating__input" id={'star-9'} type="radio" name="rating" value='9' onChange={handleChangeStar} />
          <label className="rating__label" htmlFor={'star-9'}>Rating 9</label>

          <input className="rating__input" id={'star-8'} type="radio" name="rating" value='8' onChange={handleChangeStar} />
          <label className="rating__label" htmlFor={'star-8'}>Rating 8</label>

          <input className="rating__input" id={'star-7'} type="radio" name="rating" value='7' onChange={handleChangeStar} />
          <label className="rating__label" htmlFor={'star-7'}>Rating 7</label>

          <input className="rating__input" id={'star-6'} type="radio" name="rating" value='6' onChange={handleChangeStar} />
          <label className="rating__label" htmlFor={'star-6'}>Rating 6</label>

          <input className="rating__input" id={'star-5'} type="radio" name="rating" value='5' onChange={handleChangeStar} />
          <label className="rating__label" htmlFor={'star-5'}>Rating 5</label>

          <input className="rating__input" id={'star-4'} type="radio" name="rating" value='4' onChange={handleChangeStar} />
          <label className="rating__label" htmlFor={'star-4'}>Rating 4</label>

          <input className="rating__input" id={'star-3'} type="radio" name="rating" value='3' onChange={handleChangeStar} />
          <label className="rating__label" htmlFor={'star-3'}>Rating 3</label>

          <input className="rating__input" id={'star-2'} type="radio" name="rating" value='2' onChange={handleChangeStar} />
          <label className="rating__label" htmlFor={'star-2'}>Rating 1</label>

          <input className="rating__input" id={'star-1'} type="radio" name="rating" value='1' onChange={handleChangeStar} />
          <label className="rating__label" htmlFor={'star-1'}>Rating 1</label>
        </div>
      </div>

      <div className="add-review__text" style={{ backgroundColor: `rgba(${hexToRgba(reviewFilm.backgroundColor)})` }}>
        <textarea
          className="add-review__textarea"
          name="review-text"
          id="review-text"
          placeholder="Review text"
          ref={textReviewValue}
          defaultValue={textReview}
          onChange={handleChangeText}
          maxLength={400}
          minLength={50}
        />
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">Post</button>
        </div>

      </div>
    </form>
  );
}
