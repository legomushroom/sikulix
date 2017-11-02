
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
};

export interface ITestScenarios {
    [key: string]: ITestScenario;
};
