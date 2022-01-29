import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import index from './reducers';
import rootSaga from '../sagas'
import createSagaMiddleware from '@redux-saga/core';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    index,
    applyMiddleware(thunk, sagaMiddleware),
);

sagaMiddleware.run(rootSaga)

// const action = type => store.dispatch({type})

export default store;