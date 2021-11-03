import { Link } from 'react-router-dom';


type AddReviewBtnProps = {
    id: number
}

export default function AddReviewBtn({id}:AddReviewBtnProps):JSX.Element {
  return (
    <Link to={`/films/${id}/review`} className='btn film-card__button'>Add review</Link>
  );
}
