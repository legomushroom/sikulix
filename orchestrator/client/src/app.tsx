import { h, render, Component } from 'preact';
import { Provider } from 'preact-redux';

import { style } from './decorators/style';
import { store } from './store';

import styles from './app.scss';

@style(styles)
class App extends Component<{}, {}> {
  render () {
    return (
      <Provider store={store}>
        <div className='app'></div>
      </Provider>
    );
  }
}

render(<App />, document.querySelector('#js-vsrtc-e2e-tests-app'));
