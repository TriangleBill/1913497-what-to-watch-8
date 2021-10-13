import { useState } from 'react'
import RatingStar from './ratingStar';

export default function FormReview() {
    
    const [starRating, setStarRating] = useState('7')
    const [textReview, setTextReview] = useState('')

    function toggleRating (star:string) {
        setStarRating(star)
    }

    return (
        <>
            <form action="#" className="add-review__form">
              <div className="rating">
                <div className="rating__stars">
                 <RatingStar starNumber='10' starState={starRating}/>

                 <RatingStar starNumber='9' starState={starRating}/>

                 <RatingStar starNumber='8' starState={starRating} />

                 <RatingStar starNumber='7' starState={starRating}/>

                 <RatingStar starNumber='6' starState={starRating}/>

                 <RatingStar starNumber='5' starState={starRating}/>

                 <RatingStar starNumber='4' starState={starRating}/>

                 <RatingStar starNumber='3' starState={starRating}/>

                 <RatingStar starNumber='2' starState={starRating}/>

                 <RatingStar starNumber='1' starState={starRating}/>
                </div>
              </div>

              <div className="add-review__text">
                <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"></textarea>
                <div className="add-review__submit">
                  <button className="add-review__btn" type="submit">Post</button>
                </div>

              </div>
            </form>
        </>
    )
}
