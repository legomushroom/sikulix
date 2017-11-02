import io from 'socket.io-client';
import { store } from './store';

import { addAgent } from 'reducers/agents/agents-actions';

class Socket {
  private socket;
  private store;
  
  constructor(store) {
    this.store = store;
    const { location } = window;
    const { hostname, port, protocol } = location;

    this.socket = io.connect(`${protocol}//${hostname}:${port}/frontend`);

    this.connect();
  }

  private connect() {
    console.log('conenct function');
    this.socket.on('connect', () => {
      console.log('orchestrator client connected');

      this.socket.on('agent connection', (id) => {
        console.log('agent connection', id);
        this.store.dispatch(addAgent(id));
      });

    });
    
    this.socket.on('disconnect', () => {
      this.socket.off('agent connection');
      // this.store.dispatch(setServerStatus(IServerState.Disconnected));
    });
  }
};

export default () => { new Socket(store) };
