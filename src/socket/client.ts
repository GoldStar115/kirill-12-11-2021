import {WSEvent, AppDispatch} from '../type';
import {updateSocketState, updateOrderData} from '../redux/actions';
class WSSClient {
  wssClient: any;
  configure = (dispatch: AppDispatch) => {
    this.wssClient = new WebSocket('wss://www.cryptofacilities.com/ws/v1');
    this.wssClient.onopen = () => {
      dispatch(updateSocketState(true, null));
    };
    this.wssClient.onclose = (e: string) => {
      dispatch(updateSocketState(false, e));
    };
    this.wssClient.onerror = (error: string) => {
      dispatch(updateSocketState(true, error));
    };
    this.wssClient.onmessage = (message: any) => {
      try {
        const data = JSON.parse(message.data);
        dispatch(updateOrderData(data));
      } catch (error) {}
    };
  };

  submitWSEvent = (wsEvent: WSEvent) => {
    if (this.wssClient) {
      this.wssClient.send(JSON.stringify(wsEvent));
    }
  };

  stopWSEvent = () => {
    if (this.wssClient) {
      this.wssClient.close();
    }
  };
}

export default {
  init() {
    return new WSSClient();
  },
};
