import { h, Component } from 'preact';
import { style } from 'decorators/style';
import { connect } from 'preact-redux';

import { ITestScenarios } from 'tests/interfaces';

import { getTestScenarios } from 'reducers/test-scenarios/test-scenarios-selectors';
import { TestScenario } from 'components/test-scenario/test-scenario';

import styles from './test-scenarios.scss';

interface ITestScenariosProps {
  testScenarios?: ITestScenarios;
};

@style(styles)
export class TestScenariosComponent extends Component<ITestScenariosProps, {}> {
  private renderScenarios(testScenarios: ITestScenarios = {}) {

    const ids = Object.keys(testScenarios);
    return ids.map((id, i) => {
      return (<TestScenario id={id} { ...testScenarios[id] } />);
    });

  }

  render () {
    return (
      <div class='testScenarios'>
        { this.renderScenarios(this.props.testScenarios) }
      </div>
    );
  }
};

const mapStateToProps = (state, props) => {

  return {
    testScenarios: getTestScenarios(state)
  };
}

export const TestScenarios = connect(mapStateToProps)(TestScenariosComponent);
