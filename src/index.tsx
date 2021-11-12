import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, View, StyleSheet} from 'react-native';
import WSSClient from './socket';
import {
  Header,
  ToogleButton,
  OrderBookTitle,
  OrderBookRow,
  OrderBookSpread,
} from './component';

import {OrderMutationType, RootState, SocketState} from './type';
import {useAppDispatch, useAppSelector, useWindowSize} from './hooks';
import {getMaxTotal, trimOrderData} from './utils';
import {clearOrderData} from './redux/actions';

const MainApp = () => {
  const dispatch = useAppDispatch();
  const {chartHeight, numberOfDisplay, rowHeight} = useWindowSize();
  const [productId, setProductId] = useState<string>('PI_XBTUSD');
  const socketState = useAppSelector(
    (state: RootState) => state.socketState,
  ) as SocketState;
  const orderBook = useAppSelector(
    (state: RootState) => state.orderbook[productId],
  ) as OrderMutationType;

  useEffect(() => {
    if (socketState.connection) {
      WSSClient.submitWSEvent({
        event: 'subscribe',
        feed: 'book_ui_1',
        product_ids: [productId],
      });
    }
  }, [socketState, productId]);

  const maxBidTotal = getMaxTotal(
    trimOrderData(orderBook?.bids, orderBook?.numLevels, true),
  );
  const maxAskTotal = getMaxTotal(
    trimOrderData(orderBook?.asks, orderBook?.numLevels, false),
  );
  return (
    <SafeAreaView style={styles.safeContaienr}>
      <StatusBar barStyle={'light-content'} />
      <Header
        title="Order Book"
        connected={socketState.connection}
        onReconnect={() => {
          WSSClient.configure(dispatch);
        }}
      />
      <View style={styles.container}>
        <OrderBookTitle />
        <View style={[styles.bidContainer, {height: chartHeight}]}>
          {Object.keys(
            trimOrderData(orderBook?.bids, orderBook?.numLevels, true),
          )
            .slice(0, numberOfDisplay)
            .reverse()
            .map(item => (
              <OrderBookRow
                height={rowHeight}
                isAsk={false}
                maxValue={Math.max(maxBidTotal, maxAskTotal)}
                priceData={orderBook.bids[item]}
                key={item}
              />
            ))}
        </View>
        <OrderBookSpread spread={13} spreadPercent={0.04} />
        <View style={[styles.askContainer, {height: chartHeight}]}>
          {Object.keys(
            trimOrderData(orderBook?.asks, orderBook?.numLevels, false),
          )
            .slice(0, numberOfDisplay)
            .map(item => (
              <OrderBookRow
                height={rowHeight}
                isAsk={true}
                maxValue={Math.max(maxBidTotal, maxAskTotal)}
                priceData={orderBook.asks[item]}
                key={item}
              />
            ))}
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <ToogleButton
          title="Toogle Feed"
          onPress={() => {
            dispatch(clearOrderData(null));
            const changeProducId =
              productId === 'PI_XBTUSD' ? 'PI_ETHUSD' : 'PI_XBTUSD';
            WSSClient.submitWSEvent({
              event: 'unsubscribe',
              feed: 'book_ui_1',
              product_ids: [productId],
            });
            setProductId(changeProducId);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContaienr: {flex: 1, backgroundColor: 'black'},
  container: {
    flexGrow: 1,
  },
  bidContainer: {justifyContent: 'flex-start'},
  askContainer: {justifyContent: 'flex-end'},
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
});
export default MainApp;
