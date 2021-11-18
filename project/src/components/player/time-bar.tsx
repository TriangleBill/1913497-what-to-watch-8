import { useEffect, useState } from 'react';

type TimeBarProps = {
    videoRef: HTMLVideoElement | null,
    filmIsPlayed: boolean
}

export default function TimeBar({ videoRef, filmIsPlayed }: TimeBarProps): JSX.Element {
    const [timePercent, setTimePercent] = useState(0)


    useEffect(() => {
        if (videoRef) {
            const interval = setInterval(() => setTimePercent((videoRef.currentTime * 100) / (videoRef.duration)), 1000);
            if (!filmIsPlayed) clearInterval(interval);
            return () => {
                clearInterval(interval);
            };
        }
    }, [filmIsPlayed])

    return (
        <>
            <progress className="player__progress" value={timePercent} max="100"></progress>
            <div className="player__toggler"
                style={{ left: `${timePercent}%` }}
            >
                Toggler
            </div>
        </>
    )
}
