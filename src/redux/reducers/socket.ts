import {SocketState} from '../../type';

const socketState = (
  state = {
    connection: false,
    error: null,
  },
  action: {
    type: string;
    data: SocketState;
  },
): SocketState => {
  let newState;
  switch (action.type) {
    case 'UPDATE_SOCKET_STATE':
      if (action.data) {
        newState = action.data;
        return newState;
      }
      return state;
    default:
      return state;
  }
};

export default socketState;
