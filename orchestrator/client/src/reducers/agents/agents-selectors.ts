import { IAgents } from 'reducers/agents/agents-interfaces';

export const getAgents = (state): IAgents => {
  return state.agents;
};
