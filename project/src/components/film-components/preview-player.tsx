import { useEffect, useRef } from "react";
import { setTimeout } from 'timers';

type PreviewPlayerProps = {
    src: string,
    poster: string,
    activeFilm: string,
    filmId: string,
}


export default function PreviewPlayer(props: PreviewPlayerProps): JSX.Element {

  const videoRef= useRef<HTMLVideoElement>(null)

  useEffect(() => {
      if (null !== videoRef.current && props.activeFilm == props.filmId) {
        videoRef.current.play()
      } else {
        videoRef.current?.pause()
        videoRef.current?.load()
      }

  }, [props.activeFilm])
 

  return (
    <video src={props.src} autoPlay={false} controls={false} width="280" height="175" poster={props.poster} loop muted style={{ objectFit: 'cover'}} ref={videoRef}>

    </video>
  );
}
