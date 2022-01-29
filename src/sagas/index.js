
import { all, takeLatest } from 'redux-saga/effects'

import { GET_GISTS, GET_FORKS } from '../store/actionTypes'

import { getGists, getForks } from './gists'

function* rootSaga() {
    yield all([
        // Gists
        takeLatest(GET_GISTS, getGists),
        takeLatest(GET_FORKS, getForks),
    ])
}

export default rootSaga