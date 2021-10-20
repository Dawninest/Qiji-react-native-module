import React from 'react';
import {FlatList, Image, StyleSheet, Text, View, Pressable} from 'react-native';
import {useBlue} from 'src/util';

const DemoList = [
  {id: 0, key: 'SearchDemo', name: '支持字段搜索的搜索框'},
  {id: 1, key: 'PopDemo', name: 'pop浮窗组件'},
  {id: 2, key: 'DatePickerDemo', name: '日期选择器'},
  {id: 3, key: 'ScheduleDemo', name: '日程展示页'},
];

const Header = ({title = '标题'}) => {
  return (
    <View style={styles.headerStyle}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const Footer = ({title = '尾部'}) => {
  return (
    <View style={styles.footerStyle}>
      <Text style={styles.footerTextStyle}>{title}</Text>
    </View>
  );
};

const MainList = ({navigation}) => {
  const renderItem = ({item: {key, name}, index}) => {
    return (
      <Pressable
        style={styles.itemView}
        onPress={() => navigation.navigate(key)}>
        {index === 0 && <View style={[styles.line, {top: 0}]} />}
        <Text style={styles.itemText}>{name}</Text>
        <Image
          style={styles.arrowStyle}
          source={require('./image/icn_right_arrow.png')}
        />
        {index === DemoList.length - 1 && (
          <View style={[styles.line, {bottom: 0}]} />
        )}
      </Pressable>
    );
  };

  return (
    <View style={{width: '100%', height: '100%'}}>
      <Header title={'组件'} />
      <FlatList
        data={DemoList}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        // style={{borderWidth: 1}}
        ItemSeparatorComponent={() => (
          <View style={{width: '100%', height: 1, backgroundColor: useBlue}} />
        )}
      />
      <Footer title={'add more...'} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    height: 44,
    width: '100%',
    backgroundColor: useBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20,
    color: 'white',
  },
  footerStyle: {
    height: 44,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: useBlue,
  },
  footerTextStyle: {
    fontSize: 20,
    color: useBlue,
  },
  itemView: {
    flexDirection: 'row',
    width: '100%',
    minHeight: 60,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  arrowStyle: {
    width: 20,
    height: 30,
    tintColor: useBlue,
    marginRight: 10,
  },
  itemText: {
    flex: 1,
    fontSize: 20,
    color: useBlue,
    marginLeft: 10,
  },
  line: {
    position: 'absolute',
    width: '100%',
    height: 1,
    backgroundColor: useBlue,
  },
});

export default MainList;
