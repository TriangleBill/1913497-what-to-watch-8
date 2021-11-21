
type FullScreenBtnProps = {
    videoRef: HTMLVideoElement | null
}

export default function FullScreenBtn({videoRef}: FullScreenBtnProps): JSX.Element {
  function openFullScreen() {
    if (videoRef && videoRef.requestFullscreen) {
      videoRef.requestFullscreen();
    }
  }

  return (
    <button onClick={openFullScreen} type="button" className="player__full-screen">
      <svg viewBox="0 0 27 27" width="27" height="27">
        <use xlinkHref="#full-screen"></use>
      </svg>
      <span>Full screen</span>
    </button>
  );
}
