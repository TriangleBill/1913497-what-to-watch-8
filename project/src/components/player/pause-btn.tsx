
type PauseBtnProps = {
    onClick: () => void
}

export default function PauseBtn({ onClick }: PauseBtnProps): JSX.Element {
  return (
    <button type="button" className="player__play">
      <svg data-testid="svg-pause" onClick={onClick} viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#pause"></use>
      </svg>
      <span>Pause</span>
    </ button>
  );
}
