import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuthorizationStatus } from './../../store/user-process/selector';
import { AuthorizationStatus } from '../../const';


type AddReviewBtnProps = {
    id: number
}

function AddReviewBtn({id}:AddReviewBtnProps):JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (
      <Link to={`/films/${id}/review`} className='btn film-card__button'>Add review</Link>
    );
  } else {return <div></div>;}


}

export default memo(AddReviewBtn);
