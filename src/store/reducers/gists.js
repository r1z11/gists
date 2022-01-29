import { SET_GISTS, GET_GISTS_FAILED, LOADING_GISTS, SET_FORKS, LOADING_FORKS, GET_FORKS_FAILED, RESET } from '../actionTypes'

const defaultState = {
    gists: [],
    error: null,
    loading: false,
    forks: [],
    loadingForks: false,
    forksError: null
}

const gistsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_GISTS: {
            return {
                ...state,
                gists: [...action.payload],
                error: null
            }
        }
        case GET_GISTS_FAILED: {
            return {
                ...state,
                error: action.payload
            }
        }
        case LOADING_GISTS: {
            return {
                ...state,
                loading: action.payload,
                error: null
            }
        }
        case SET_FORKS: {
            return {
                ...state,
                forks: action.payload,
                forksError: null
            }
        }
        case LOADING_FORKS: {
            return {
                ...state,
                loadingForks: action.payload,
                forksError: null
            }
        }
        case GET_FORKS_FAILED: {
            return {
                ...state,
                forksError: action.payload
            }
        }
        case RESET:
            return defaultState
        default:
            return state
    }
}

export default gistsReducer