import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { Actions } from '../../types/action';
import { FilmsDescription } from '../../types/films';
import { State } from '../../types/state';
import Card from './card';

type FilmsListProps = {
  films: FilmsDescription[];
}

const mapStateToProps = ({genre}: State) => ({
  genre,
})

const  mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onChangeGenre (genre:string) {
      
  }
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>
type ConnectedComponentProps = PropsFromRedux & FilmsListProps


export default function FilmsList({ films }: FilmsListProps): JSX.Element {
  const [activeFilm, setActiveFilm] = useState('');


  return (
    <>
      {films.map((film, id) => (
        <Card key={film.id} activeFilm={activeFilm} filmData={film} setActiveFilm={setActiveFilm} />
      ))}
    </>
  );
}
