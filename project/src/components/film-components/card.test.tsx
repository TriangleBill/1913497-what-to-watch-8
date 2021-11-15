import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import Card from './card';
import { makeFakeFilmsList } from './../../store/utils/mocks';
import faker from 'faker';
window.HTMLMediaElement.prototype.load = () => (null);
window.HTMLMediaElement.prototype.pause = () => (null);

describe('Component: Card', () => {
  it('should render correctly', () => {

    const history = createMemoryHistory();
    const fakeFilmData = makeFakeFilmsList()[0];
    const fakeMouseEvent = jest.fn();
    const fakeState = faker.datatype.number();
    render(
      <Router history={history}>
        <Card filmData={fakeFilmData} setActiveFilm={fakeMouseEvent} activeFilm={fakeState}/>
      </Router>,
    );

    expect(screen.getByText(fakeFilmData.name)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
