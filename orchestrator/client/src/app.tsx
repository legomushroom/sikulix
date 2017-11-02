import { h, render, Component } from 'preact';
import { Provider } from 'preact-redux';

import { style } from './decorators/style';
import { store } from './store';

import { TestScenarios } from 'components/test-scenarios/test-scenarios';

import styles from './app.scss';

@style(styles)
class App extends Component<{}, {}> {
  render () {
    return (
      <Provider store={store}>
        <div className='app'>
          <TestScenarios />
        </div>
      </Provider>
    );
  }
}

render(<App />, document.querySelector('#js-vsrtc-e2e-tests-app'));
