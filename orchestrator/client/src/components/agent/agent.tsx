import { h, Component } from 'preact';
import { style } from 'decorators/style';

import styles from './agent.scss';

import { IAgent } from 'reducers/agents/agents-interfaces';

interface IAgentProps extends IAgent {};

@style(styles)
export class Agent extends Component<IAgentProps, {}> {
  render () {
    const { id } = this.props;

    return (
      <div className='agent'>
        { id }
      </div>
    );
  }
};
