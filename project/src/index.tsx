import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { checkAuthAction, fetchFilmsAction, fetchPromoFilmAction } from './store/api-actions';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app/app';
import store from './store/store';


store.dispatch(checkAuthAction());
store.dispatch(fetchFilmsAction());
store.dispatch(fetchPromoFilmAction());


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
