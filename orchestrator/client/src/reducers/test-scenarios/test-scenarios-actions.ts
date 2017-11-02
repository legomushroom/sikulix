import { createActionCreator, createSimpleActionCreator } from 'reducers/action-creators';
import { ITestScenarios } from 'tests/interfaces';

export const setTestScenarios = createActionCreator<ITestScenarios>('scenarios.set.scenarios');