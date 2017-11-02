import { h, Component } from 'preact';
import { style } from 'decorators/style';
import { connect } from 'preact-redux';

import { IAgents } from 'reducers/agents/agents-interfaces';
import { getAgents } from 'reducers/agents/agents-selectors';
import { Agent } from 'components/agent/agent';

import styles from './agents.scss';

interface IAgentsProps {
  agents: IAgents;
};

@style(styles)
export class AgentsComponent extends Component<IAgentsProps, {}> {

  private renderAgents() {
    const { agents } = this.props;
    const agentsIds = Object.keys(agents);

    return agentsIds.map((id, i) => {
      return <Agent { ...agents[id] } />
    });
  }

  render () {
    return (
      <div className='agents'>
        {this.renderAgents()}
      </div>
    );
  }
};

const mapStateToProps = (state, props) => {
  return {
    agents: getAgents(state)
  };
}

export const Agents = connect(mapStateToProps)(AgentsComponent);
