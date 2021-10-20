import React, {useRef, useState} from 'react';
import {
  TextInput,
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  Keyboard,
} from 'react-native';
import {useBlue, clone} from '../util';

const defaultText = '输入关键字';
const addText = '添加关键字';

const KeyWordBar = ({keyWord, deleteKeyWord}) => {
  return (
    <View style={styles.keyWordView}>
      <Text style={styles.keyWordText}>{keyWord}</Text>
      <Pressable
        style={styles.keyWordBtn}
        onPress={() => deleteKeyWord(keyWord)}>
        <Image
          style={styles.keyWordImg}
          source={require('src/image/close_g.png')}
        />
      </Pressable>
    </View>
  );
};

const SearchBar = ({searchCallBack}) => {
  const inputRef = useRef();
  const [value, onChangeText] = useState('');
  const [keyWordArr, setKeyWordArr] = useState([]);

  const deleteKeyWord = index => {
    let newKeyWordArr = clone(keyWordArr);
    newKeyWordArr.splice(index, 1);
    setKeyWordArr(newKeyWordArr);
  };

  const setKeyWord = () => {
    if (value === '') {
      return;
    }
    let newKeyWordArr = clone(keyWordArr);
    newKeyWordArr.push(value);
    setKeyWordArr(newKeyWordArr);
    onChangeText('');
    setTimeout(() => {
      inputRef.current.focus();
    }, 100);
  };

  const doSearch = () => {
    Keyboard.dismiss();
    let searchKeyWordArr = clone(keyWordArr);
    if (value !== '') {
      searchKeyWordArr.push(value);
      setKeyWordArr(searchKeyWordArr);
      onChangeText('');
    }
    setTimeout(() => searchCallBack(searchKeyWordArr), 100);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        {keyWordArr.length > 0 &&
          keyWordArr.map((keyWord, index) => (
            <KeyWordBar
              keyWord={keyWord}
              deleteKeyWord={() => deleteKeyWord(index)}
            />
          ))}
        <View style={styles.inputBack}>
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={value}
            placeholder={keyWordArr.length > 0 ? addText : defaultText}
            onChangeText={text => onChangeText(text)}
            onSubmitEditing={setKeyWord}
            returnKeyType={'done'}
            autoFocus={true}
            keyboardShouldPersistTaps={true}
          />
          <Pressable style={styles.searchBtn} onPress={doSearch}>
            <Text style={styles.searchBtnText}>{'搜索'}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 60,
    backgroundColor: useBlue,
  },
  inputView: {
    // flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
    flexWrap: 'wrap',
  },
  inputBack: {
    flex: 1,
    flexDirection: 'row',
    minWidth: '40%',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderRadius: 5,
    fontSize: 16,
    marginHorizontal: 2,
    marginTop: 2,
    marginBottom: 2,
  },
  keyWordView: {
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: useBlue,
    borderRadius: 5,
    flexDirection: 'row',
    marginHorizontal: 2,
    marginVertical: 2,
  },
  keyWordText: {
    color: 'white',
    fontSize: 12,
    marginLeft: 5,
  },
  keyWordBtn: {
    paddingHorizontal: 5,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyWordImg: {
    width: 8,
    height: 8,
    tintColor: 'white',
  },
  searchBtn: {
    height: 26,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 5,
    backgroundColor: useBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  searchBtnText: {
    color: 'white',
    fontSize: 14,
  },
});

export default SearchBar;
