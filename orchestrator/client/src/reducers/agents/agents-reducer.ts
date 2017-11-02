import { Action } from 'redux';
import { IAgents, IAgent, IAgentStatus } from 'reducers/agents/agents-interfaces';

import { addAgent, removeAgent, setAgentStatus } from 'reducers/agents/agents-actions';

const initialState = {};
export const agentsReducer = (state: IAgents = initialState, action: Action): IAgents => {
  switch (action.type) {
      case addAgent.type: {
        const agent = addAgent.unwrap(action);
        const currentAgent = state[agent.id];
        const status = (currentAgent && currentAgent.status) || 'ready';

        return {
          ...state,
          [agent.id]: { ...agent, status }
        };
      }

      case removeAgent.type: {
        const id = removeAgent.unwrap(action);
        const newState = { ...state };

        delete newState[id];
        return newState;
      }

      case setAgentStatus.type: {
        const { id, status } = setAgentStatus.unwrap(action);
        const agent = state[id];
        
        return {
          ...state,
          [id]: {
            ...agent,
            status
          }
        };
      }

      default:
        return state;
  }
};
