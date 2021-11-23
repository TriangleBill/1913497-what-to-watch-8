import { useEffect, useState } from 'react';

type TimeBarProps = {
  videoRef: HTMLVideoElement | null,
  filmIsPlayed: boolean,
  isLoaded: boolean
}

export default function TimeBar({ videoRef, filmIsPlayed, isLoaded }: TimeBarProps): JSX.Element {
  const [timePercent, setTimePercent] = useState(0);


  useEffect(() => {
    if (videoRef && isLoaded) {
      const interval = setInterval(() => setTimePercent((videoRef.currentTime * 100) / (videoRef.duration)), 1000);
      if (!filmIsPlayed) { clearInterval(interval); }
      return () => {
        clearInterval(interval);
      };
    }
  }, [filmIsPlayed, videoRef, isLoaded]);

  return (
    <>
      <progress className="player__progress" value={timePercent} max="100"></progress>
      <div data-testid="toggler" className="player__toggler"
        style={{ left: `${timePercent}%` }}
      >
        Toggler
      </div>

    </>
  );
}
