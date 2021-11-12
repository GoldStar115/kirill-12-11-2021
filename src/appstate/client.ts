import {AppState} from 'react-native';
import WSSClient from '../socket';

class AppStateClient {
  /*****************************************************************
   * app state
   *****************************************************************/
  appState = 'active';

  handleAppStateChange = (nextAppState: string) => {
    const state = this.appState;
    this.appState = nextAppState;

    const leaving =
      state === 'active' && /inactive|background/.test(nextAppState);
    if (leaving) {
      WSSClient.stopWSEvent();
    }
  };

  open = () => {
    AppState.addEventListener('change', this.handleAppStateChange);
  };

  close = () => {
    AppState.removeEventListener('change', this.handleAppStateChange);
  };
}

export default {
  init() {
    return new AppStateClient();
  },
};
