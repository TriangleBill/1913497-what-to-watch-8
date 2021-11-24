
import { useHistory } from 'react-router';

type ExitBtnProps = {
    filmId: number
}

export default function ExitBtn({filmId}: ExitBtnProps): JSX.Element {
  const history = useHistory();

  function handleClick() {
    history.push(`/films/${filmId}`);
  }

  return (
    <button onClick={handleClick} type="button" className="player__exit">Exit</button>
  );
}
