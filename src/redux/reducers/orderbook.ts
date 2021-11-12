// @flow

import {WSResEvent, OrderStateData} from '../../type';
import {orderDataUtils} from '../../utils';

const orderbook = (
  state: OrderStateData = {},
  action: {
    type: string;
    data: WSResEvent | null;
  },
): OrderStateData => {
  let newState: OrderStateData = {};
  switch (action.type) {
    case 'UPDATE_ORDERBOOK':
      if (action.data && action.data.product_id) {
        const product_id = action.data.product_id;
        const bids = orderDataUtils(
          action.data.bids,
          state[product_id]?.bids || {},
          true,
        );
        const asks = orderDataUtils(
          action.data.asks,
          state[product_id]?.asks || {},
          false,
        );
        newState = {};
        newState[product_id] = {
          bids,
          asks,
          numLevels: action.data.numLevels || state[product_id].numLevels || 0,
        };
        return newState;
      }
      return state;
    case 'CLEAR_ORDERBOOK':
      newState = {};
      return newState;
    default:
      return state;
  }
};

export default orderbook;
