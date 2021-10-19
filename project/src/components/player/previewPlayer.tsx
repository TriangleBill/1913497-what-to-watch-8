
import { MouseEventHandler } from 'react';
type PreviewPlayerProps = {
    src: string,
    poster: string,
    stopPreview: MouseEventHandler,
    playPreview: MouseEventHandler,
    cardIsActive: boolean,
    setActiveCard: Function
}


export default function PreviewPlayer(props: PreviewPlayerProps): JSX.Element {

    function onMouseOver(e:any) {
        props.playPreview(e)
        props.setActiveCard(true)
    }

    function onMouseOut(e:any) {
        props.stopPreview(e)
        props.setActiveCard(false)
    }

  return (
    <video src={props.src} autoPlay={false} controls={false} width="280" height="175" poster={props.poster} loop muted style={{ objectFit: 'cover'}} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>

    </video>
  );
}
