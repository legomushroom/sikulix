import { createActionCreator, createSimpleActionCreator } from 'reducers/action-creators';
import { IAgent, IAgentStatus } from 'reducers/agents/agents-interfaces';

export const addAgent = createActionCreator<IAgent>('agents.add.agent');
export const removeAgent = createActionCreator<string>('agents.remove.agent');

export const setAgentStatus = createActionCreator<Partial<IAgent>>('agents.set.status');
