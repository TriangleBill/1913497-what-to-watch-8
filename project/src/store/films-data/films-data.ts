import { createReducer } from "@reduxjs/toolkit";
import { FilmsData } from "../../types/state";
import { setFilms } from "../action";

const initialState: FilmsData = {
    filmsList: [],
    isLoadData: true
}


export const filmsData = createReducer(initialState, (builder) => {
    builder
        .addCase(setFilms, (state, action) => {
            const {films} = action.payload
            state.filmsList = films;
            state.isLoadData = false
        })
})