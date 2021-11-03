import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { FilmsDescription } from '../../types/films';
import { State } from '../../types/state';
import Card from './card';


const mapStateToProps = ({ genre, filmsList }: State) => ({
  genre,
  filmsList,
});


const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>


export function FilmsList(props: PropsFromRedux): JSX.Element {
  const [activeFilm, setActiveFilm] = useState(0);

  const cardElement: FilmsDescription[] = [];


  for (let i = 0; i < props.filmsList.length; i++) {
    if (findFilms(props.filmsList[i].genre, props.genre) && cardElement.length < 8) {
      cardElement.push(props.filmsList[i]);
    }
  }


  function findFilms(filmsList: string, genre: string) {
    if (filmsList.includes(genre) || genre === 'All genres') {
      return true;
    }
  }

  function renderCards() {
    return (
      cardElement[0] ?
        cardElement.map((el, _id) => (
          <Card key={el?.id} activeFilm={activeFilm} filmData={el} setActiveFilm={setActiveFilm} />
        ))
        :
        <h1>Films not found</h1>);
  }


  return (
    <>
      {renderCards()}
    </>
  );
}

export default connector(FilmsList);
