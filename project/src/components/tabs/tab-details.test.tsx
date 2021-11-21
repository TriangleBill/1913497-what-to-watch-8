import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import { makeFakeFilmsList } from './../../store/utils/mocks';
import TabDetails from './tab-details';


describe('Component: Tab-details', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const fakeFilm = makeFakeFilmsList()[0];

    render(
      <Router history={history}>
        <TabDetails film={fakeFilm}/>
      </Router>,
    );
    setTimeout(() => {
      expect(screen.getByText('Director')).toBeInTheDocument();
      expect(screen.getByText(fakeFilm.director)).toBeInTheDocument();
      expect(screen.getByText('Starring')).toBeInTheDocument();
      fakeFilm.starring.forEach((el) => {
        expect(screen.getByText(el)).toBeInTheDocument();
      });
      expect(screen.getByText('Run Time')).toBeInTheDocument();
      expect(screen.getByText('Genre')).toBeInTheDocument();
      expect(screen.getByText(fakeFilm.genre)).toBeInTheDocument();
      expect(screen.getByText('Released')).toBeInTheDocument();
      expect(screen.getByText(fakeFilm.released)).toBeInTheDocument();
    }, 5000);

  });
});
