import io from 'socket.io-client';

import { capitalizeText } from 'utils/capitalize-text';

class Socket {
  private socket;
  private store;
  
  constructor(store) {
    this.store = store;
    const { location } = window;
    const { hostname, port, protocol } = location;

    this.socket = io.connect(`${protocol}//${hostname}:${port}`);

    this.connect();
  }

  private connect() {
    this.socket.on('connect', () => {
      console.log('orchestrator client connected');
      // this.store.dispatch(setServerStatus(IServerState.Connected));

      // this.socket.on('send users', (users: IUsersList, statusString: string) => {
      //   const status = IUserStatus[capitalizeText(statusString)] as any;
        
      //   this.store.dispatch(setUsers({ users, status }));
      // });

      // this.socket.on('reset user status', (user) => {
      //   this.store.dispatch(resetUserStatus(user));
      // });
    });
    
    this.socket.on('disconnect', () => {
      // this.store.dispatch(setServerStatus(IServerState.Disconnected));
    });
  }
}

export default Socket;
