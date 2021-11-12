import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Button from './Button';
interface Props {
  title: string;
  connected: boolean;
  onReconnect: () => void;
}
const Header = ({title, connected, onReconnect}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {!connected && <Button title="Reconnect" onPress={onReconnect} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderStyle: 'solid',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    padding: 10,
    backgroundColor: 'black',
    height: 50,
  },
  title: {color: 'white'},
});
export default Header;
