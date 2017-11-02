
interface IEnviromentVariables {
    [key: string]: string;
};

export interface ITestDefinition {
    enviromentVariables: IEnviromentVariables;
    name: string;
    scriptPath: string;
};

export interface ITestScenario {
    test: ITestDefinition[];
    progress: number;
    name: string;
};

export interface ITestScenarios {
    [key: string]: ITestScenario;
};
