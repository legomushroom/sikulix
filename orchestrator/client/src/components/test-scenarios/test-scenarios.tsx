import { h, Component } from 'preact';
import { style } from 'decorators/style';
import { connect } from 'preact-redux';

import { ITestScenarios } from 'tests/interfaces';

import { getTestScenarios } from 'reducers/test-scenarios/test-scenarios-selectors';

import styles from './test-scenarios.scss';

interface ITestScenariosProps {
  testScenarios?: ITestScenarios;
};

@style(styles)
export class TestScenariosComponent extends Component<ITestScenariosProps, {}> {
  private renderScenarios(testScenarios: ITestScenarios = {}) {

    const ids = Object.keys(testScenarios);
    console.log(ids);

    return ids.map((id, i) => {
      return (<div>{id}</div>);
    });

  }

  render () {
    return (
      <div>
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
