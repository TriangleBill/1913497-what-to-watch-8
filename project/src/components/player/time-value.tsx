import { useEffect, useState } from 'react';

type TimeValueProps = {
  filmIsPlayed: boolean,
  videoRef: HTMLVideoElement | null,
}
export default function TimeValue({ filmIsPlayed, videoRef }: TimeValueProps): JSX.Element {
  const [timeLeftSec, setTimeLeftSec] = useState(100);


  useEffect(() => {
    if (videoRef) {
      const interval = setInterval(() => setTimeLeftSec(Math.floor(videoRef.duration - videoRef.currentTime) as number), 1000);
      if (!filmIsPlayed) { clearInterval(interval); }
      return () => {
        clearInterval(interval);
      };
    }
  }, [filmIsPlayed, videoRef]);

  if (videoRef === null) {
    return <div className="player__time-value">00:00:00</div>;
  }

  return (
    <div className="player__time-value">
      -{(new Date(timeLeftSec * 1000).toISOString().substr(11, 8))}
    </div>
  );
}
