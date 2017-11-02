import { h, Component } from 'preact';
import { style } from 'decorators/style';

import { ITestScenario, ITestDefinition } from 'tests/interfaces';

import styles from './test.scss';

interface ITestProps {
  index: number;
  test: ITestDefinition;
  id: string;
  scenarioProgress: number;
}

@style(styles)
export class Test extends Component<ITestProps, {}> {

  render () {
    const { test } = this.props;

    return (
      <div className='test'>{test.name}</div>
    );
  }
};
