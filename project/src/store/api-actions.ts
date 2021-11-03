import snakeToCamel from '../snake-to-camel';
import { ThunkActionResult } from '../types/action';
import { changeIsLoadData, setFilms } from './action';

export const fetchFilmsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get('/films');
    const camelData = snakeToCamel(data);
    dispatch(setFilms(camelData));
    dispatch(changeIsLoadData());
  };
