import { connect, ConnectedProps } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { Actions } from "../../types/action";
import { FilmsDescription } from "../../types/films";
import { changeGenre } from './../../store/action';
import { State } from "../../types/state"

type GenreListProps = {
    films: FilmsDescription[]
}

const mapStateToProps = ({genre}: State) => ({
    genre,
})

const  mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
    onChangeGenre (genre:string) {
        dispatch(changeGenre(genre))
    }
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>
type ConnectedComponentProps = PropsFromRedux & GenreListProps

export function GenreList(props: ConnectedComponentProps): JSX.Element {
    const genres: string[] = []

    props.films.map((el, id) => {
        el.genre.forEach((el) => {
            if (!genres.includes(el)) {
                genres.push(el)
            }
        })
    })

    function onClick(e:any) {
        const genre = e.target.innerText
        props.onChangeGenre(genre)
    }

    return (
        <>
            <ul className="catalog__genres-list">
                <li className={`catalog__genres-item ${props.genre == 'All genres'? 'catalog__genres-item--active' : ''}`}>
                    <div onClick={onClick} style={{ cursor: 'pointer' }} className="catalog__genres-link">All genres</div>
                </li>
                {genres.map((el, id) => (
                    <li className={`catalog__genres-item ${props.genre == el? 'catalog__genres-item--active' : ''}`}>
                        <div onClick={onClick} style={{ cursor: 'pointer' }} className="catalog__genres-link">{el}</div>
                    </li>
                ))}
            </ul>
        </>
    )
}


export default connector(GenreList)
