
type PreviewPlayerProps = {
    src: string,
    poster: string,
}


export default function PreviewPlayer({ src, poster }: PreviewPlayerProps): JSX.Element {
  let timeoutId: ReturnType<typeof setTimeout>;

  function play(e:any) {
    timeoutId = setTimeout(()=> {
      if (e) {
        e.target.play();
      }
    }, 5000);

  }


  function stop(e: any) {
    const vid = e.target;
    if (e !== null) {
      vid.pause();
      vid.currentTime = 0;
      vid.load();
    }
    if (timeoutId) {clearTimeout(timeoutId);}
  }


  return (
    <video src={src} autoPlay={false} controls={false} width="280" height="175" poster={poster} loop muted style={{ objectFit: 'cover'}} onMouseOver={play} onMouseOut={stop}>

    </video>
  );
}
