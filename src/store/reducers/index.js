import { combineReducers } from 'redux';
import gists from './gists';

export default combineReducers({
    gists: gists,
});