import Main from './../main/main';

type appProps = {
  filmName: string,
  genre: string,
  releasedYear: number
}

function App({filmName, genre, releasedYear}: appProps): JSX.Element {
  return <Main filmName={filmName} genre={genre} releasedYear={releasedYear} />;
}

export default App;
