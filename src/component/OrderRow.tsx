import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {PriceData} from '../type';
import {fixedFormatStr, floatFormatStr} from '../utils';
interface Props {
  height: number;
  isAsk: boolean;
  maxValue: number;
  priceData: PriceData | null | undefined;
}
const OrderBookRow = ({height, isAsk, maxValue, priceData}: Props) => {
  if (!priceData) {
    return null;
  }
  const transColor = isAsk ? '#068c3e7A' : '#bd08087A';
  const color = isAsk ? '#068c3e' : '#bd0808';
  const backgroundPercent = (priceData.total / maxValue) * 100;
  return (
    <View style={[styles.container, {height}]}>
      <View
        style={[
          StyleSheet.absoluteFill,
          {backgroundColor: transColor, width: `${backgroundPercent}%`},
        ]}
      />
      <View style={[styles.itemContiner, {width: '40%'}]}>
        <Text style={[styles.price, {color}]}>
          {floatFormatStr(priceData.price)}
        </Text>
      </View>
      <View style={[styles.itemContiner, {width: '25%'}]}>
        <Text style={styles.title}>{fixedFormatStr(priceData.size)}</Text>
      </View>
      <View style={[styles.itemContiner, {width: '25%'}]}>
        <Text style={styles.title}>{fixedFormatStr(priceData.total)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  itemContiner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  price: {color: '#bd0808', fontWeight: '600'},
  title: {color: 'white', fontWeight: '600'},
});
export default OrderBookRow;
