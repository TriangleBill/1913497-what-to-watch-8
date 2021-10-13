import { useState } from "react"
import { FilmsDescription } from "../../types/films"
import Card from "./card"

type FilmsListProps = {
    films: FilmsDescription[];
}

export default function FilmsList({films}: FilmsListProps): JSX.Element {
    const [activeFilm, setActiveFilm] = useState('')

    return (
        <>
            {films.map((film, id) => {
                return (
                    <Card filmName={film.name} previewImage={film.poster} />
                )
            })}
        </>
    )
}
