import { ITestScenarios } from 'tests/interfaces';

export const getTestScenarios = (state): ITestScenarios => {
  return state.testScenarios;
};
