type FilmPosterProps = {
    filmPoster: string,
    filmName: string,
}

export default function FilmPoster({filmPoster, filmName}: FilmPosterProps) {
    return (
        <>
            <img src={filmPoster} alt={filmName} width='218' height='327' />
        </>
    )
}
