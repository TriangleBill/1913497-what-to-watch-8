import { Actions, ActionType } from "../types/action"
import { State } from "../types/state"
import {films} from '../mocks/films'

const initialState = {
   genre : 'All genres',
   filmsList: films
}

const reducer = (state: State = initialState, action:Actions) => {
    switch (action.type) {
        case ActionType.ChangeGenre:
            return {...state, genre: action.payload};
        case ActionType.GetFilms:
            return {...state, filmsList: action.payload}
        default:
            return state
    }
}

export default reducer