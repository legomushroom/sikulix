
export declare type IAgentStatus = 'ready' | 'busy';

export interface IAgent {
  id: string;
  // socket;
  status?: IAgentStatus;
  // os: string;
};

export interface IAgents {
  [key: string]: IAgent;
};
