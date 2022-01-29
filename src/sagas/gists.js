import { call, put } from 'redux-saga/effects'
import { apiUrl } from '../utils/constants'
import { GET_GISTS_FAILED, SET_GISTS, LOADING_GISTS, SET_FORKS, LOADING_FORKS, GET_FORKS_FAILED } from '../store/actionTypes'
import axios from 'axios'

// Get gists
export function* getGists(action) {
    yield put({ type: LOADING_GISTS, payload: true })

    try {
        const response = yield call(axios.get, apiUrl + action.payload)
        const gists = response.data

        yield put({ type: SET_GISTS, payload: gists })
        yield put({ type: LOADING_GISTS, payload: false })
    } catch (error) {
        console.log('Get gists error', error)
        yield put({ type: GET_GISTS_FAILED, payload: error.message })
        yield put({ type: LOADING_GISTS, payload: false })
    }
}

// Get forks
export function* getForks(action) {
    yield put({ type: LOADING_FORKS, payload: true })

    try {
        const response = yield call(axios.get, apiUrl + action.payload)

        // console.log('Get forks', response.data.forks)
        const forks = response.data

        yield put({ type: SET_FORKS, payload: forks })
        yield put({ type: LOADING_FORKS, payload: false })
    } catch (error) {
        console.log('Get forks error', error)
        yield put({ type: GET_FORKS_FAILED, payload: error.message })
        yield put({ type: LOADING_FORKS, payload: false })
    }
}