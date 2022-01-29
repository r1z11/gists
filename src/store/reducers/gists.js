import { SET_GISTS, GET_GISTS_FAILED, LOADING_GISTS, SET_FORKS, LOADING_FORKS, RESET } from '../actionTypes'

const defaultState = {
    gists: [],
    error: null,
    loading: false,
    forks: []
}

export default (state = defaultState, action) => {
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
                loading: action.payload
            }
        }
        case SET_FORKS: {
            const newArray = [...state.forks, ...action.payload];
            return {
                ...state,
                forks: newArray
            }
        }
        case LOADING_FORKS: {
            const index = state.forks.findIndex(fork => fork.id !== action.payload.id);
            const newArray = [...state.forks];
            newArray[index].loading = action.payload.loading;
            return {
                ...state,
                forks: newArray
            }
        }
        case RESET:
            return defaultState
        default:
            return state
    }
}