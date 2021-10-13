import React from 'react'

type RatingStarProps = {
    starNumber:string,
    starState:string
}

export default function RatingStar({starNumber, starState}:RatingStarProps):JSX.Element {




    return (
        <>
            <input className="rating__input" id={`star-${starNumber}`} type="radio" name="rating" value={starNumber} checked={starNumber === starState}/>
            <label className="rating__label" htmlFor={`star-${starNumber}`}>Rating {starNumber}</label>
        </>
    )
}
