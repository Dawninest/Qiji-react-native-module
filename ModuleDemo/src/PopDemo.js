import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {useBlue} from 'src/util';
import AlertModule from './modules/AlertModule';

const demoLongText =
  '提示文本-提示文本-提示文本-提示文本-提示文本-提示文本-提示文本\n-提示文本-提示文本-提示文本-提示文本\n-提示文本-提示文本-提示文本-提示文本\n-提示文本-提示文本-提示文本-提示文本';

const Button = ({text = '', onPress}) => {
  return (
    <Pressable style={styles.btn} onPress={onPress}>
      <Text style={styles.btnText}>{text}</Text>
    </Pressable>
  );
};

const PopDemo = () => {
  const coverLoading0 = () => {
    AlertModule.show({
      type: 0,
      title: '加载中...',
      allowClose: false,
    });
    setTimeout(() => {
      AlertModule.hidden();
    }, 2000);
  };

  const coverLoading1 = () => {
    AlertModule.show({
      type: 0,
      title: '加载中...',
      allowClose: true,
    });
  };

  const baseAlert0 = () => {
    AlertModule.show({
      type: 1,
      title: '提示标题',
      detail: demoLongText,
      buttons: [
        {
          type: 'common',
          text: '确定',
          onPress: () => {
            AlertModule.hidden();
          },
        },
      ],
    });
  };

  const baseAlert1 = () => {
    AlertModule.show({
      type: 1,
      title: '提示标题',
      detail: demoLongText,
      buttons: [
        {
          type: 'common',
          text: '确定',
          onPress: () => {
            AlertModule.hidden();
          },
        },
        {
          type: 'cancel',
          text: '取消',
        },
      ],
    });
  };

  const baseAlert2 = () => {
    AlertModule.show({
      type: 1,
      title: '提示标题',
      detail: demoLongText,
      buttons: [
        {
          type: 'common',
          text: '选项一',
          onPress: () => {
            AlertModule.hidden();
          },
        },
        {
          type: 'common',
          text: '选项二',
          onPress: () => {
            AlertModule.hidden();
          },
        },
        {
          type: 'common',
          text: '选项三',
          onPress: () => {
            AlertModule.hidden();
          },
        },
        {
          type: 'cancel',
          text: '取消',
        },
      ],
    });
  };

  const basePop0 = () => {
    AlertModule.show({
      type: 2,
      title: '提示标题',
      buttons: [
        {
          type: 'common',
          text: '选项一',
          onPress: () => {
            AlertModule.hidden();
          },
        },
        {
          type: 'common',
          text: '选项二',
          onPress: () => {
            AlertModule.hidden();
          },
        },
        {
          type: 'common',
          text: '选项三',
          onPress: () => {
            AlertModule.hidden();
          },
        },
        {
          type: 'common',
          text: '选项四',
          onPress: () => {
            AlertModule.hidden();
          },
        },
        {
          type: 'cancel',
          text: '取消',
        },
      ],
    });
  };

  const basePop1 = () => {
    AlertModule.show({
      type: 2,
      diyComponent: (
        <View
          style={{
            width: '100%',
            height: 600,
            backgroundColor: useBlue,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              color: 'white',
            }}>
            可自定义的View
          </Text>
        </View>
      ),
    });
  };

  return (
    <View style={styles.container}>
      <Button text={'覆盖式Loading-无关闭按钮'} onPress={coverLoading0} />
      <Button text={'覆盖式Loading-有关闭按钮'} onPress={coverLoading1} />
      <Button text={'基础弹窗-单选项'} onPress={baseAlert0} />
      <Button text={'基础弹窗-2选项'} onPress={baseAlert1} />
      <Button text={'基础弹窗-多选项'} onPress={baseAlert2} />
      <Button text={'升起式选择弹窗'} onPress={basePop0} />
      <Button text={'升起式大页弹窗'} onPress={basePop1} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  btn: {
    width: '80%',
    height: 40,
    borderRadius: 5,
    backgroundColor: useBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  btnText: {
    fontSize: 18,
    color: 'white',
  },
});

export default PopDemo;
