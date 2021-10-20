/**
 * React Native Module Demo
 * https://www.dawninest.com
 *
 */

import React from 'react';
import {SafeAreaView, View, StatusBar, useColorScheme} from 'react-native';
import MainList from './MainListView';
import SearchDemo from './SearchDemo';
import PopDemo from './PopDemo';
import DatePickerDemo from './DatePickerDemo';
import ScheduleDemo from './ScheduleDemo';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AlertModule from 'src/modules/AlertModule';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? 'dark-content' : 'light-content',
  };

  const Stack = createNativeStackNavigator();

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="MainList">
            <Stack.Screen
              name="MainList"
              component={MainList}
              options={{title: '组件例子'}}
            />
            <Stack.Screen
              name="SearchDemo"
              component={SearchDemo}
              options={{title: '搜索栏示例子'}}
            />
            <Stack.Screen
              name="PopDemo"
              component={PopDemo}
              options={{title: '弹窗例子'}}
            />
            <Stack.Screen
              name="DatePickerDemo"
              component={DatePickerDemo}
              options={{title: '日期选择期'}}
            />
            <Stack.Screen
              name="ScheduleDemo"
              component={ScheduleDemo}
              options={{title: '日期选择期'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
      <AlertModule />
    </View>
  );
};

export default App;
