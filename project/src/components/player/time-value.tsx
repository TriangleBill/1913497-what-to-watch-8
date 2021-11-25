import { useEffect, useState } from 'react';

type TimeValueProps = {
  filmIsPlayed: boolean,
  videoRef: HTMLVideoElement | null,
  isLoaded: boolean
}
export default function TimeValue({ filmIsPlayed, videoRef, isLoaded }: TimeValueProps): JSX.Element {
  const [timeLeftSec, setTimeLeftSec] = useState(100);
  const MILISECONDS = 1000;

  useEffect(() => {
    if (videoRef && isLoaded) {
      const interval = setInterval(() => setTimeLeftSec(Math.floor(videoRef.duration - videoRef.currentTime) as number), MILISECONDS);
      if (!filmIsPlayed) { clearInterval(interval); }
      return () => {
        clearInterval(interval);
      };
    }
  }, [filmIsPlayed, videoRef, isLoaded]);

  if (videoRef === null) {
    return <div className="player__time-value">00:00:00</div>;
  }

  return (
    <div className="player__time-value">
      -{(new Date(timeLeftSec * 1000).toISOString().substr(11, 8))}
    </div>
  );
}
