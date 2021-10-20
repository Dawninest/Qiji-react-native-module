import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useBlue} from 'src/util';

const DatePickerDemo = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
    backgroundColor: useBlue,
  },
});

export default DatePickerDemo;
