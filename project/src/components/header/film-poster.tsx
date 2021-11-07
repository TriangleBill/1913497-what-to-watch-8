import { memo } from "react"

type FilmPosterProps = {
    filmPoster: string,
    filmName: string,
}

function FilmPoster({filmPoster, filmName}: FilmPosterProps) {
    return (
        <>
            <img src={filmPoster} alt={filmName} width='218' height='327' />
        </>
    )
}

export default memo(FilmPoster)
