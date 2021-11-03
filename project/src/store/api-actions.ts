import { ThunkActionResult } from "../types/action";
import { changeIsLoadData, setFilms } from "./action";

export const fetchFilmsAction = (): ThunkActionResult => 
    async (dispatch, _getState, api): Promise<void> => {
        const {data} = await api.get('/films');
        dispatch(setFilms(data));
        dispatch(changeIsLoadData())
    }