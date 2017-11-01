import * as express from 'express';
import * as sockets from 'socket.io';
import * as fs from 'fs';
import * as path from 'path';

import { exec } from 'child_process';
import rimraf from 'rimraf';

import * as socketClient from 'socket.io-client';

const app = express();

const PORT = 5000;
const server = app
  .listen(PORT, () => {
    console.log(
      `
      -=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-
      | Server is up at http://localhost:${PORT} |
      -=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-
      `
    );
  });

const serverUrl = 'http://localhost:3000';
const socket = socketClient.connect(serverUrl);

interface IEnviromentVariables {
    [key: string]: string;
};

interface ITestDefinition {
    enviromentVariables: IEnviromentVariables;
    name: string;
    scriptPath: string;
};

const setEnviromentVariables = (enviromentVariables: IEnviromentVariables) => {
    for (let key of Object.keys(enviromentVariables)) {
        process.env[key] = enviromentVariables[key];
    };
};

const resetEnviromentVariables = (enviromentVariables: IEnviromentVariables) => {
    for (let key of Object.keys(enviromentVariables)) {
        delete process.env[key];
    };
};

const ROOT = '../';
const DIRNAME = path.resolve(__dirname, ROOT);
const TEMP_TEST_FOLDER = 'temp';
const TEMP_TEST_FILE_NAME = 'test.sikuli';
const TEMP_FOLDER = path.join(DIRNAME, TEMP_TEST_FOLDER);
const TEMP_FILE = path.join(TEMP_FOLDER, TEMP_TEST_FILE_NAME);

const SIKULIX_SCRIPTS_FOLDER_NAME = './sikuli-scripts';
const SIKULIX_SCRIPTS_FOLDER = path.join(DIRNAME, SIKULIX_SCRIPTS_FOLDER_NAME);

const runSikuliScript = (filepath: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        exec(`sikulix -r ${filepath}`, (error, stdout, stderr) => {
            resolve(stdout);
        });
    });
};

interface ITestResult {
    log: string;
    data: string;
    status: string;
};

const getValue = (record: string) => {
    const split = record.split(' : ');
    // return everything but the first item
    return [split[1], split[2]];
}

const getTestAttributes = (output: string): ITestResult => {
    const scriptLoglineRegexp = /VSRTC SIKULI SCRIPT\s\:\s\w+\s\:\s.+$/gim; 
    // get all script log lines
    const match = output.match(scriptLoglineRegexp);
    // remove all script log lines
    output = output.replace(scriptLoglineRegexp, '');

    const result = {
        log: output,
        status: 'FAIL'
    } as ITestResult;

    if (!match) {
        return result;
    }

    for (let record of match) {
        const value = getValue(record);
        result[value[0]] = value[1];
    }

    return result;
};

const runTest = async (test: ITestDefinition): Promise<ITestResult> => {
    setEnviromentVariables(test.enviromentVariables);
    try {
        const output = await runSikuliScript(path.join(SIKULIX_SCRIPTS_FOLDER, test.scriptPath));
        return getTestAttributes(output);

    } catch (e) {
        console.log(`[agent]: sikuli script fail`, e);
    }
    resetEnviromentVariables(test.enviromentVariables);
};

socket.on('connect', () => {
    console.log('agent is connected to orchestrator');
});

// io.on('connection', function (socket) {
//     console.log('orchestrator is connected');

//     socket.on('run test', (testDefinition: ITestDefinition) => {

//     })
// });

export default app;

// const test1: ITestDefinition = {
//     enviromentVariables: {
//         SIKULI_VSRTC_PROVIDER: 'MICROSOFT'
//     },
//     scriptPath: 'login-test.sikuli',
//     name: 'Login with MS'
// };

// const test2: ITestDefinition = {
//     enviromentVariables: {
//         SIKULI_VSRTC_PROVIDER: 'GITHUB'
//     },
//     scriptPath: 'login-test.sikuli',
//     name: 'Login with GitHub'
// };

// setTimeout(async () => {
//     // const result1 = await runTest(test1);
//     // console.log(`${test1.name} -- ${result1.status}\n\n`, result1.log);
    
//     const result2 = await runTest(test2);
//     console.log(`${test2.name} -- ${result2.status}\n\n`, result2.log);
// }, 1000);
