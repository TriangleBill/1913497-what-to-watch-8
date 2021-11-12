
import { createAPI } from './../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/state';
import { Action } from 'redux';
import { checkAuthAction, fetchFilmsAction } from './api-actions';
import { requireAuthorization, setFilms } from './action';
import { AuthorizationStatus } from '../const';
import { AuthData } from '../types/auth-data';
import { makeFakeFilmsList } from './utils/mocks';

describe('Async actions', () => {
    const onFakeUnauthorized = jest.fn()
    const api = createAPI(onFakeUnauthorized())
    const mockAPI = new MockAdapter(api)
    const middlewares = [thunk.withExtraArgument(api)]

    const mockStore = configureMockStore<
        State,
        Action,
        ThunkDispatch<State, typeof api, Action>
    >(middlewares);

    it('should authorization status is "auth" when sever return 200', async () => {
        const store = mockStore()
        mockAPI
            .onGet('/login')
            .reply(200, [])

        expect(store.getActions()).toEqual([])

        await store.dispatch(checkAuthAction())

        expect(store.getActions()).toEqual([
            requireAuthorization(AuthorizationStatus.Auth)
        ])
    })

    it('should dispatch setFilms when GET /films', async () => {
        const mockFilms = makeFakeFilmsList()
        mockAPI
            .onGet('/films')
            .reply(200, mockFilms)

        const store = mockStore()
        await store.dispatch(fetchFilmsAction())

        expect(store.getActions()).toEqual([
            setFilms(mockFilms)
        ])
    })
})