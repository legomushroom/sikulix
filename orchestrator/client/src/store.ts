import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { scenarios } from './tests/tests';
import { testScenariosReducer } from 'reducers/test-scenarios/test-scenarios-reducer';
import { setTestScenarios } from 'reducers/test-scenarios/test-scenarios-actions';

import { agentsReducer } from 'reducers/agents/agents-reducer';

export const store = createStore(combineReducers({
  testScenarios: testScenariosReducer,
  agents: agentsReducer
}), applyMiddleware(thunk));

store.dispatch(setTestScenarios(scenarios));
