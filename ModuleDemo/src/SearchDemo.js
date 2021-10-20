import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useBlue} from 'src/util';
import SearchBar from 'src/modules/SearchBar';

const SearchDemo = () => {
  const [keyWordArr, setKeyWordArr] = useState([]);
  const [searchRes, setSearchRes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const demoSearchRes = Array(20)
    .fill()
    .map((_, i) => i);

  useEffect(() => {});

  const doSearch = getKeyWordArr => {
    setKeyWordArr(getKeyWordArr);
    setIsLoading(true);
    setTimeout(() => {
      setSearchRes(demoSearchRes);
      setIsLoading(false);
    }, 1000);
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.itemBack}>
        <Text style={styles.itemText}>demo示例搜索结果{item}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar searchCallBack={doSearch} />
      {searchRes.length > 0 && (
        <FlatList
          data={searchRes}
          keyExtractor={(_, index) => index}
          renderItem={renderItem}
          ItemSeparatorComponent={() => (
            <View
              style={{width: '100%', height: 1, backgroundColor: useBlue}}
            />
          )}
        />
      )}
      {isLoading && (
        <View style={styles.loadingBack}>
          <ActivityIndicator size={'large'} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
  },
  loadingBack: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemBack: {
    height: 40,
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  itemText: {
    fontSize: 20,
    color: useBlue,
  },
});

export default SearchDemo;
