import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

interface Props {
  spread: number;
  spreadPercent: number;
}
const OrderBookSpread = ({spread, spreadPercent}: Props) => {
  return (
    <View style={styles.container}>
      <Text
        style={styles.title}>{`Spread ${spread} (${spreadPercent} %)`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {color: 'grey'},
});
export default OrderBookSpread;
