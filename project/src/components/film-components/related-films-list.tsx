import _ from 'lodash';
import { useState } from 'react';
import { FilmsDescription } from '../../types/films';
import Card from './card';

type RelatedFilmsListProps = {
  films: FilmsDescription[],
  filmId: number
}

export default function RelatedFilmsList(props: RelatedFilmsListProps): JSX.Element {
  const [activeFilm, setActiveFilm] = useState(0);
  let cardElements: FilmsDescription[] = [];
  for (const key in props.films) {
    if (props.films[key].id !== props.filmId) {
      cardElements.push(props.films[key]);
    }
  }

  cardElements = cardElements.map((el: FilmsDescription) => _.mapKeys(el, (_value, key: string) => _.camelCase(key))) as FilmsDescription[];
  cardElements = Object.entries(cardElements).slice(0,4).map((entry) => entry[1]);


  function renderComponent() {
    if (cardElements[0]) {
      return cardElements.filter((el) => el.id !== props.filmId).map((el) => <Card key={el?.id} activeFilm={activeFilm} filmData={el} setActiveFilm={setActiveFilm} />);
    } else {
      return <h1>Related films not found</h1>;
    }
    // cardElements.map((el, _id) => {
    //   if (el.id !== props.filmId) {return <Card key={el?.id} activeFilm={activeFilm} filmData={el} setActiveFilm={setActiveFilm} />;}
  }


  return (
    <>
      {renderComponent()}
    </>
  );
}
