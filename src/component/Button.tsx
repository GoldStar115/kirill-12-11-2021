import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
}
const ToogleButton = ({title, onPress}: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.btnContainer}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: 'purple',
    borderRadius: 6,
  },
  title: {color: 'white'},
});
export default ToogleButton;
