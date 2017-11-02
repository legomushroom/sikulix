import { Action } from 'redux';
import { ITestScenarios } from 'tests/interfaces';

import {
  setTestScenarios
} from 'reducers/test-scenarios/test-scenarios-actions';

const initialState = {};

export const testScenariosReducer = (state: ITestScenarios = initialState, action: Action): ITestScenarios => {
  switch (action.type) {
      case setTestScenarios.type: {
        const testScenarios = setTestScenarios.unwrap(action);
        return { ...testScenarios };
      }

      default:
        return state;
  }
};
