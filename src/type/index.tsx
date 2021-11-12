import store from '../redux';
export interface PriceData {
  price: number;
  size: number;
  total: number;
}
export interface OrderBook {
  [key: string]: PriceData;
}

export interface OrderMutationType {
  bids: OrderBook;
  asks: OrderBook;
  numLevels: number;
}

export interface OrderStateData {
  [key: string]: OrderMutationType;
}

export interface WSEvent {
  event: string;
  feed: string;
  product_ids: Array<string>;
}

export interface WSResEvent {
  event?: string;
  version?: number;
  product_ids?: Array<string>;
  numLevels?: number;
  feed: string;
  product_id: string;
  bids: Array<Array<number>>;
  asks: Array<Array<number>>;
}

export interface SocketState {
  connection: boolean;
  error: string | null;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
