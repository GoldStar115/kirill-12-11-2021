// @flow
import {combineReducers} from 'redux';
import socketState from './socket';
import orderbook from './orderbook';

const appReducer = combineReducers({
  socketState,
  orderbook,
});

export default appReducer;
