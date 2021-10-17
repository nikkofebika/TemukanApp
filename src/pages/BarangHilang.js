import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {
  Box,
  Button,
  Divider,
  HStack,
  Text,
  VStack,
  Input,
  ScrollView,
  FlatList,
  Spinner,
} from 'native-base';
import MyIcon from '../components/atoms/MyIcon';
import BoxItem from '../components/molecules/BoxItem';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {API_URL as apiUrl} from '../config/const/url';
import {useFocusEffect} from '@react-navigation/core';
const API_URL = apiUrl + 'items/2/';
const BarangHilang = ({navigation, route}) => {
  const [items, setItems] = useState([]);
  const [offset, setOffset] = useState(0);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [stopLoadMore, setStopLoadMore] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      fetchItems();
    }, []),
  );

  useEffect(() => {
    if (offset > 0) {
      console.log('useeffect offset ' + offset);
      handleLoadMore();
    }
  }, [offset]);

  const fetchItems = () => {
    setIsLoadMore(true);
    fetch(API_URL + '0')
      .then(response => response.json())
      .then(res => {
        console.log('URL', API_URL + '0');
        console.log(res.data);
        setItems(res.data.items);
        setIsLoadMore(false);
        setStopLoadMore(false);
      })
      .catch(error => console.error(error));
  };

  const handleLoadMore = () => {
    setIsLoadMore(true);
    fetch(API_URL + offset)
      .then(response => response.json())
      .then(res => {
        console.log('URL handleLoadMore', API_URL + offset);
        console.log('handleLoadMore', res.data);
        if (res.data.items && res.data.items.length > 0) {
          console.log('success handleLoadMore');
          setItems([...items, ...res.data.items]);
        } else {
          setStopLoadMore(true);
          console.log('failed');
        }
        setIsLoadMore(false);
      })
      .catch(error => console.error(error));
  };

  const renderItem = ({item}) => {
    return (
      <BoxItem
        key={item.id}
        id={item.id}
        itemName={item.name}
        findDate={item.find_date}
        model={item.model}
        color={item.color}
        specificLocation={item.specific_location}
        location={item.location_name}
        region={item.region}
        createdAt={item.created_at}
        clickDetail={() =>
          navigation.navigate('DetailItem', {
            itemId: item.id,
            itemName: item.name,
          })
        }
      />
    );
  };

  const footerComponent = useMemo(() => {
    console.log('render button');
    if (!stopLoadMore) {
      return isLoadMore ? (
        <Text textAlign="center">Loading...</Text>
      ) : (
        <Button my={2} mx={3} onPress={() => setOffset(offset + 2)}>
          Muat Lainnya
        </Button>
      );
    }
    return null;
  }, [isLoadMore]);

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      onRefresh={() => {
        setIsRefresh(true);
        fetchItems();
        setOffset(0);
        setIsRefresh(false);
      }}
      refreshing={isRefresh}
      // onEndReached={() => {
      //   !stopLoadMore && setOffset(offset + 20);
      // }}
      // onEndReachedThreshold={0}
      ListFooterComponent={footerComponent}
    />
  );
};

export default BarangHilang;
