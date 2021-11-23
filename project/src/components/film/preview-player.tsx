import { useEffect, useRef } from 'react';

type PreviewPlayerProps = {
  src: string,
  poster: string,
  activeFilm: number,
  filmId: number,
}


export default function PreviewPlayer(props: PreviewPlayerProps): JSX.Element {

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (null !== videoRef.current && props.activeFilm === props.filmId) {
      videoRef.current.play();
    } else if (null !== videoRef.current) {
      videoRef.current.pause();
      videoRef.current.load();
    }

  });


  return (
    <video
      data-testid="video"
      src={props.src}
      autoPlay={false}
      controls={false}
      width="280"
      height="175"
      poster={props.poster}
      loop
      muted
      style={{ objectFit: 'cover' }}
      ref={videoRef}
    >

    </video>
  );
}
