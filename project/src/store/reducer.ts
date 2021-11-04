import { AuthorizationStatus } from '../const';
import { Actions, ActionType } from '../types/action';
import { State } from '../types/state';

const initialState = {
  genre: 'All genres',
  filmsList: [],
  isLoadData: true,
  authorizationStatus: AuthorizationStatus.Unknown,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeGenre:
      return { ...state, genre: action.payload };
    case ActionType.SetFilms:
      return { ...state, filmsList: action.payload };
    case ActionType.ChangeIsLoadData:
      return { ...state, isLoadData: false };
    case ActionType.RequireAuthorization:
      return {...state, authorizationStatus: action.payload};
    case ActionType.RequireLogout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};
    default:
      return state;
  }
};

export default reducer;
