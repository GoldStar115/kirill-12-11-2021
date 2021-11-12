import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
const OrderBookTitle = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.itemContiner, {width: '40%'}]}>
        <Text style={styles.title}>{'Price'}</Text>
      </View>
      <View style={[styles.itemContiner, {width: '25%'}]}>
        <Text style={styles.title}>{'Size'}</Text>
      </View>
      <View style={[styles.itemContiner, {width: '25%'}]}>
        <Text style={styles.title}>{'Total'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 30,
    width: '100%',
    alignItems: 'center',
    borderStyle: 'solid',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    backgroundColor: 'black',
  },
  itemContiner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
  title: {color: 'grey'},
});
export default OrderBookTitle;
