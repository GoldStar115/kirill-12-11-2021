import {OrderBook, PriceData} from '../type';
import lodash from 'lodash';

export const orderDataUtils = (
  data: Array<Array<number>>,
  oldData: OrderBook,
  isBid: boolean,
): OrderBook => {
  let priceData: OrderBook = oldData;
  if (data && data.length > 0) {
    for (const item of data) {
      if (item && item.length > 0) {
        const price = item[0];
        const size = item[1];
        if (typeof price === 'number' && size > 0) {
          const orderBook = {
            price,
            size,
            total: size,
          };
          priceData[`${price}`] = orderBook;
        }
      }
    }
  }
  if (!priceData) {
    return {};
  }
  // trim data
  const sortedKeys = Object.keys(priceData);
  let sliceKeys: Array<string> = [];
  if (isBid) {
    if (sortedKeys.length > 200) {
      sliceKeys = sortedKeys.splice(sortedKeys.length - 200, sortedKeys.length);
    } else {
      sliceKeys = sortedKeys.splice(0, sortedKeys.length);
    }
  } else {
    sliceKeys = sortedKeys.splice(0, 200);
  }
  let newPriceData: OrderBook = {};
  sliceKeys.map(key => {
    newPriceData[key] = priceData[key];
  });
  return newPriceData;
};

export const trimOrderData = (
  priceData: OrderBook,
  level: number,
  isBid: boolean,
): OrderBook => {
  if (!priceData) {
    return {};
  }
  const keys = Object.keys(priceData);
  const sortedKeys = lodash.sortBy(keys);
  let sliceKeys: Array<string> = [];
  let total = 0;
  if (isBid) {
    if (sortedKeys.length > level) {
      sliceKeys = sortedKeys.splice(
        sortedKeys.length - level,
        sortedKeys.length,
      );
    } else {
      sliceKeys = sortedKeys.splice(0, sortedKeys.length);
    }
    for (const key of sliceKeys) {
      const sizeOfKey = priceData[key].size;
      total = total + sizeOfKey;
      priceData[key].total = total;
    }
  } else {
    sliceKeys = sortedKeys.splice(0, level);
    for (const key of sliceKeys) {
      const sizeOfKey = priceData[key].size;
      total = total + sizeOfKey;
      priceData[key].total = total;
    }
  }
  let newPriceData: OrderBook = {};
  sliceKeys.map(key => {
    newPriceData[key] = priceData[key];
  });
  return newPriceData;
};

export const getMaxTotal = (orderBook: OrderBook): number => {
  let maxSize = 0;
  const orderBooks = Object.values(orderBook);
  const priceData = lodash.maxBy(orderBooks, (o: PriceData) => {
    return o.total;
  });
  if (priceData) {
    maxSize = priceData.total;
  }
  return maxSize;
};

export const floatFormatStr = (amount: number): string => {
  return Number(amount)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

export const fixedFormatStr = (amount: number): string => {
  return `${amount}`.replace(/\d(?=(\d{3})+\.)/g, '$&,');
};
