import {WSResEvent} from '../../type';

// @flow
export const updateOrderData = (data: WSResEvent | null) => ({
  type: 'UPDATE_ORDERBOOK',
  data,
});

export const clearOrderData = (data: WSResEvent | null) => ({
  type: 'CLEAR_ORDERBOOK',
  data,
});
