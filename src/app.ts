import * as express from 'express';
import * as sockets from 'socket.io';
import * as fs from 'fs';
import * as path from 'path';

import { exec } from 'child_process';
import rimraf from 'rimraf';

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

const io = sockets(server);

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

// const writeFile = (path: string, contents: string) => {
//     return new Promise((resolve, reject) => {
//         fs.writeFile(path, contents, (error) => {
//             if (error) {
//                 reject(error);
//             }
//             resolve(error);
//         }); 
//     });
// };

const ROOT = '../';
const DIRNAME = path.resolve(__dirname, ROOT);
const TEMP_TEST_FOLDER = 'temp';
const TEMP_TEST_FILE_NAME = 'test.sikuli';
const TEMP_FOLDER = path.join(DIRNAME, TEMP_TEST_FOLDER);
const TEMP_FILE = path.join(TEMP_FOLDER, TEMP_TEST_FILE_NAME);

const SIKULIX_SCRIPTS_FOLDER_NAME = './sikuli-scripts';
const SIKULIX_SCRIPTS_FOLDER = path.join(DIRNAME, SIKULIX_SCRIPTS_FOLDER_NAME);

// const temporarySaveSikuliScript = async (path: string, sikuliScript: string) => {
//     try {
//         await writeFile(TEMP_FOLDER, sikuliScript);
//     } catch(e) {
//         console.log(`[agent]: error while writing file`, e);
//     }
// };

// const removeTemporaryFolder = (path: string) => {
//     return new Promise((resolve, reject) => {
//         rimraf(path, function (e) {
//             if (e) {
//                 reject(e);
//             }

//             resolve();
//         });
//     });
// };

const runSikuliScript = (filepath: string) => {
    return new Promise((resolve, reject) => {
        exec(`sikulix -r ${filepath}`, (error, stdout, stderr) => {
            resolve(stdout);
        });
    });
};

const test: ITestDefinition = {
    enviromentVariables: {
        SIKULI_VSRTC_PROVIDER: 'MICROSOFT'
    },
    scriptPath: 'login.sikuli',
    name: 'login'
}

const runTest = async (test: ITestDefinition) => {
    setEnviromentVariables(test.enviromentVariables);
    // await temporarySaveSikuliScript(TEMP_FILE, skikuliScript);

    try {
        const output = await runSikuliScript(path.join(SIKULIX_SCRIPTS_FOLDER, test.scriptPath));
        console.log(output);
    } catch (e) {
        console.log(`[agent]: sikuli script fail`, e);
    }
    
    
    // await removeTemporaryFolder(TEMP_FOLDER);
    resetEnviromentVariables(test.enviromentVariables);
};

setTimeout(() => {
    runTest(test);
}, 2000);

io.on('connection', function (socket) {
    console.log('orchestrator is connected');

    socket.on('run test', (testDefinition: ITestDefinition) => {

    })
});

export default app;
