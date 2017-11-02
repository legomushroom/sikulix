import { h, Component } from 'preact';
import { style } from 'decorators/style';

import { ITestScenario, ITestDefinition } from 'tests/interfaces';

import styles from './test-scenario.scss';

import { Test } from 'components/test/test';
import { Button } from 'components/button/button';

interface ITestScenarioProps extends ITestScenario {
  id: string;
}

@style(styles)
export class TestScenario extends Component<ITestScenarioProps, {}> {

  private renderTest() {
    const { id, test, progress } = this.props;

    return test.map((testItem: ITestDefinition, i) => {
      return (<Test id={id} index={i} test={testItem} scenarioProgress={progress} />);
    });
  }

  private onRun() {
    console.log('run');
  }

  render () {
    const { id, name, test, progress } = this.props;

    return (
      <div className='testScenario'>
        <h3 className='header'>{name} <span className="completed">{progress}/{test.length}</span> <Button text='run' className={'runButton'} isDisabled={true} /></h3>
        <div className='tests'>{this.renderTest()}</div>
      </div>
    );
  }
};
