import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

ReactDOM.render(
  <React.StrictMode>
    <App filmName="The Grand Budapest Hotel poster" genre="Drama" releasedYear={2014} />
  </React.StrictMode>,
  document.getElementById('root'));
