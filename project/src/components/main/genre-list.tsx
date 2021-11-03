import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { Actions } from '../../types/action';
import { changeGenre } from './../../store/action';
import { State } from '../../types/state';

const mapStateToProps = ({genre, filmsList}: State) => ({
  genre,
  filmsList
});

const  mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onChangeGenre (genre:string) {
    dispatch(changeGenre(genre));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

export function GenreList(props: PropsFromRedux): JSX.Element {
  const genres: string[] = [];

  props.filmsList.map((el, id) => {
      if (!genres.includes(el.genre)) {
        genres.push(el.genre);
      }
  });

  function onClick(e:any) {
    const genre = e.target.innerText;
    props.onChangeGenre(genre);
  }

  return (
    <ul className="catalog__genres-list">
      <li className={`catalog__genres-item ${props.genre === 'All genres'? 'catalog__genres-item--active' : ''}`}>
        <div onClick={onClick} style={{ cursor: 'pointer' }} className="catalog__genres-link">All genres</div>
      </li>
      {genres.map((el, id) => (
        <li key={+id+Date.now()} className={`catalog__genres-item ${props.genre === el? 'catalog__genres-item--active' : ''}`}>
          <div onClick={onClick} style={{ cursor: 'pointer' }} className="catalog__genres-link">{el}</div>
        </li>
      ))}
    </ul>
  );
}


export default connector(GenreList);
