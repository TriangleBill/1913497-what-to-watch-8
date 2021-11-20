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
  const btnRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLFieldSetElement>(null);

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


  function handleChangeStar(e: React.FormEvent<HTMLInputElement>) {
    if (e.currentTarget !== null) {
      setStarRating(Number(e.currentTarget.value));
      handleShownBtn();
    }
  }

  function handleChangeText() {
    if (null !== textReviewValue.current) {
      setTextReview(textReviewValue.current.value);
      handleShownBtn();
    }
  }

  function handleSubmit() {
    if (formRef.current !== null) {
      formRef.current.disabled = true;
      api.post(`/comments/${Number(reviewFilm.id)}`, postReviewData)
        .then(() => formRef.current ? formRef.current.disabled = false : void 0)
        .then(() => history.push(`/films/${reviewFilm.id}`))
        .catch((error) => toast.error('Не удалось отправить отзыв', error));
    }
  }

  function handleShownBtn() {
    if (btnRef.current !== null) {
      if (textReviewValue.current !== null && textReviewValue.current.value.length > 49 && textReviewValue.current.value.length < 401) {
        btnRef.current.disabled = false;
      } else {btnRef.current.disabled = true;}
    }
  }

  function renderStars() {
    const starsElements: JSX.Element[] = [];
    for (let i = 10; i > 0; i--) {
      starsElements.push(
        <>
          <input className="rating__input" id={`star-${i}`} type="radio" name="rating" value={i} onChange={handleChangeStar} />
          <label className="rating__label" htmlFor={`star-${i}`}>Rating {i}</label>
        </>,
      );
    }
    return starsElements;
  }

  return (
    <form action="" className="add-review__form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <fieldset ref={formRef} style={{border: '0 none'}}>
        <ToastContainer />
        <div className="rating">
          <div className="rating__stars">
            {renderStars().map((el) => el)}
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
            <button ref={btnRef} className="add-review__btn" type="submit" disabled>Post</button>
          </div>

        </div>
      </ fieldset>
    </form>
  );
}
