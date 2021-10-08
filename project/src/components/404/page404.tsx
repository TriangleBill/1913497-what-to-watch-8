import {Link} from 'react-router-dom';

export default function Page404():JSX.Element {
  return (
    <div style={{margin: '0 auto', width: '400px'}}>
      <h1>404 page not found</h1>
      <Link to='/'>Go back to the home page</Link>
    </div>
  );
}
