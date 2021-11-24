import { useRef, useState, useEffect, Fragment } from 'react';
import { FilmsDescription } from '../../types/films';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { postReviewAction } from './../../store/api-actions';

type FormReviewProps = {
  reviewFilm: FilmsDescription
}

export default function FormReview({ reviewFilm }: FormReviewProps): JSX.Element {
  const MAX_LENGTH = 400;
  const MIN_LENGTH = 50
  const history = useHistory();
  const dispatch = useDispatch();
  const [starRating, setStarRating] = useState(0);
  const [textReview, setTextReview] = useState('');
  const textReviewValue = useRef<HTMLTextAreaElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLFieldSetElement>(null);

  const postReviewData = {
    rating: starRating,
    comment: textReview,
  } as const;

  function hexToRgba(hex: string) {
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `${r}, ${g}, ${b}, ${0.2}`;
  }

  useEffect(() => {
    if (btnRef.current !== null) {
      if (textReview.length >= MIN_LENGTH
        && textReview.length <= MAX_LENGTH
        && starRating !== 0) {
        btnRef.current.disabled = false;
      } else { btnRef.current.disabled = true; }
    }
  }, [starRating, textReview]);

  function handleChangeStar(e: React.FormEvent<HTMLInputElement>) {
    if (e.currentTarget !== null) {
      setStarRating(Number(e.currentTarget.value));
    }
  }

  function handleChangeText() {
    if (null !== textReviewValue.current) {
      setTextReview(textReviewValue.current.value);
    }
  }

  function handleSubmit() {
    if (formRef.current !== null) {
      formRef.current.disabled = true;
      dispatch(postReviewAction(reviewFilm.id, postReviewData));
      formRef.current ? formRef.current.disabled = false : void 0;
      history.push(`/films/${reviewFilm.id}`);
    }
  }


  function renderStars() {
    const starsElements: JSX.Element[] = [];
    for (let i = 10; i > 0; i--) {
      starsElements.push(
        <Fragment key={i}>
          <input className="rating__input" id={`star-${i}`} type="radio" name="rating" value={i} onChange={handleChangeStar} />
          <label className="rating__label" htmlFor={`star-${i}`}>Rating {i}</label>
        </Fragment>,
      );
    }
    return starsElements;
  }

  return (
    <form action="" className="add-review__form" onSubmit={(e) => { e.preventDefault(); handleSubmit();}}>
      <fieldset ref={formRef} style={{ border: '0 none' }}>
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
            maxLength={MAX_LENGTH}
            minLength={MIN_LENGTH}
            data-testid="review-text"
          />
          <div className="add-review__submit">
            <button ref={btnRef} className="add-review__btn" type="submit" disabled>Post</button>
          </div>

        </div>
      </ fieldset>
    </form>
  );
}
