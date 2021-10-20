
type PreviewPlayerProps = {
    src: string,
    poster: string,
    activeFilm: string,
    filmId: string
}


export default function PreviewPlayer(props: PreviewPlayerProps): JSX.Element {
  let timeoutID: ReturnType<typeof setTimeout>

  function playPreview(e: any) {
    if (props.activeFilm === props.filmId) {
      timeoutID = setTimeout(()=>{
        e.target.play();
      }, 1000)
    }
  }

  function stopPreview(e: any) {
    clearTimeout(timeoutID)
    const vid = e.target;
    if (e !== null) {
      vid.pause();
      vid.currentTime = 0;
      vid.load();
    }
  }

  return (
    <video src={props.src} autoPlay={false} controls={false} width="280" height="175" poster={props.poster} loop muted style={{ objectFit: 'cover'}} onMouseOver={playPreview} onMouseOut={stopPreview}>

    </video>
  );
}
