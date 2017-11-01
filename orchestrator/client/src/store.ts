import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import Socket from './socket';

import { serverStatusReducer } from 'components/server-status/server-status-reducer';

const middleware = applyMiddleware(thunk);

export const store = createStore(combineReducers({
  serverStatus: serverStatusReducer
}), middleware);

const socket = new Socket(store);
