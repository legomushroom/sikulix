import { h, render, Component } from 'preact';
import { Provider } from 'preact-redux';

import { style } from './decorators/style';
import { store } from './store';
import initSocket from './socket';

import { TestScenarios } from 'components/test-scenarios/test-scenarios';
import { Agents } from 'components/agents/agents';

import styles from './app.scss';

initSocket();

@style(styles)
class App extends Component<{}, {}> {
  render () {
    return (
      <Provider store={store}>
        <div className='app'>
          <Agents />
          <TestScenarios />
        </div>
      </Provider>
    );
  }
}

render(<App />, document.querySelector('#js-vsrtc-e2e-tests-app'));
