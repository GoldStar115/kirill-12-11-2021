// @flow

import {applyMiddleware, createStore} from 'redux';

import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import WSSClient from '../socket';
import AppStateClient from '../appstate';

const configStore = (initialState = {}) => {
  const middleware = [thunkMiddleware];

  const enhancer = applyMiddleware(...middleware);
  const store = createStore(rootReducer, initialState, enhancer);
  WSSClient.configure(store.dispatch);
  AppStateClient.open();
  return store;
};

const reduxStore = configStore();

export default reduxStore;
