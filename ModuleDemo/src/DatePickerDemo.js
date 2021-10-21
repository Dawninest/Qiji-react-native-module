import React, {useState} from 'react';
import {StyleSheet, View, Pressable, Text} from 'react-native';
import {useBlue} from 'src/util';
import AlertModule from 'src/modules/AlertModule';
import CalendarModule from 'src/modules/CalendarModule';

const DatePickerDemo = () => {
  const [date, setDate] = useState('');
  const [dateArr, setDateArr] = useState([]);

  const chooseDate = () => {
    AlertModule.show({
      type: 2,
      diyComponent: <CalendarModule />,
    });
  };

  const chooseDateArr = () => {
    AlertModule.show({
      type: 2,
      diyComponent: <CalendarModule />,
    });
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.btn} onPress={chooseDate}>
        <Text style={styles.btnText}>选择日期</Text>
      </Pressable>
      <Pressable style={styles.btn} onPress={chooseDateArr}>
        <Text style={styles.btnText}>选择日期区间</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  btn: {
    width: '80%',
    backgroundColor: useBlue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  btnText: {
    fontSize: 20,
    color: 'white',
  },
});

export default DatePickerDemo;
