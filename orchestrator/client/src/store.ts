import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import Socket from './socket';
import { scenarios } from './tests/tests';
import { testScenariosReducer } from 'reducers/test-scenarios/test-scenarios-reducer';
import { setTestScenarios } from 'reducers/test-scenarios/test-scenarios-actions';

export const store = createStore(combineReducers({
  testScenarios: testScenariosReducer
}), applyMiddleware(thunk));

const socket = new Socket(store);

store.dispatch(setTestScenarios(scenarios));
