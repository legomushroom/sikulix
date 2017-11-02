import { ITestDefinition, ITestScenario, ITestScenarios } from './interfaces';

const scenarios: ITestScenarios = {};

let cnt = 0;
const addTest = (test: ITestDefinition[]) => {
    const scenario: ITestScenario = {
        test,
        progress: 0
    };

    scenarios[`${cnt++}`] = {
        test,
        progress: 0
    }
};

/**
 * Login flow with MS test.
 */
addTest([
    {
        enviromentVariables: {
            SIKULI_VSRTC_PROVIDER: 'MICROSOFT'
        },
        scriptPath: 'login-test.ssikuli',
        name: 'Login with MS'
    }
]);

/**
 * Login flow with GitHub test.
 */
addTest([
    {
        enviromentVariables: {
            SIKULI_VSRTC_PROVIDER: 'GITHUB'
        },
        scriptPath: 'login-test.ssikuli',
        name: 'Login with GitHub'
    }
]);

export { scenarios };
