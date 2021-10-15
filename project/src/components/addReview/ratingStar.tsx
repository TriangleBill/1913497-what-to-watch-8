import React, { useRef } from 'react'

type RatingStarProps = {
    starNumber: string
}

export default function RatingStar({ starNumber }: RatingStarProps): JSX.Element {


    const inputRef=useRef()

    return (
        <>
            <input className="rating__input" id={`star-${starNumber}`} type="radio" name="rating" value={starNumber} ref={useRef}/>
            <label className="rating__label" htmlFor={`star-${starNumber}`}>Rating {starNumber}</label>
        </>
    )
}
