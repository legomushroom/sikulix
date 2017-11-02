import { ITestDefinition, ITestScenario, ITestScenarios } from './interfaces';

const scenarios: ITestScenarios = {};

let cnt = 0;
const addTest = (name: string, test: ITestDefinition[]) => {
    const scenario: ITestScenario = {
        test,
        progress: 0,
        name
    };

    scenarios[`${cnt++}`] = scenario;
};

/**
 * Login flow with MS test.
 */
addTest('Login with MS scenario', [
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
addTest('Login with GitHub scenario', [
    {
        enviromentVariables: {
            SIKULI_VSRTC_PROVIDER: 'GITHUB'
        },
        scriptPath: 'login-test.ssikuli',
        name: 'Login with GitHub'
    }
]);

export { scenarios };
