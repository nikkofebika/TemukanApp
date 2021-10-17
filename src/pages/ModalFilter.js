import React, {useContext, useEffect, useState} from 'react';
import {Box, Button, CheckIcon, HStack, Input, Select, Text} from 'native-base';
import {API_URL} from '../config/const/url';
import {FilterContext} from '../config/routes';
const ModalFilter = ({navigation, route}) => {
  const {filterState, dispatch} = useContext(FilterContext);

  const [keyword, setKeyword] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [dataLocations, setDataLocations] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [dataProvinces, setDataProvinces] = useState([]);
  const [selectedRegency, setSelectedRegency] = useState(null);
  const [dataRegencies, setDataRegencies] = useState([]);
  const [isDisabledRegency, setIsDisabledRegency] = useState(true);

  useEffect(() => {
    fetchLocations();
    fetchProvinces();
    filterState.keyword != '' && setKeyword(filterState.keyword);
    filterState.locationId != null &&
      setSelectedLocation(filterState.locationId);
    if (filterState.provinceId != null) {
      setSelectedProvince(filterState.provinceId);
      fetchRegencies(filterState.provinceId);
      filterState.regencyId != null &&
        setSelectedRegency(filterState.regencyId);
    }
  }, []);

  const fetchProvinces = () => {
    fetch(API_URL + 'others/provinces')
      .then(response => response.json())
      .then(res => {
        console.log('provinces', res.data.provinces);
        setDataProvinces(res.data.provinces);
      })
      .catch(error => console.error(error));
  };

  const fetchLocations = () => {
    fetch(API_URL + 'others/locations')
      .then(response => response.json())
      .then(res => {
        console.log('locations', res.data.locations);
        setDataLocations(res.data.locations);
      })
      .catch(error => console.error(error));
  };

  const fetchRegencies = provinceId => {
    fetch(API_URL + 'others/regencies/' + provinceId)
      .then(response => response.json())
      .then(res => {
        console.log(res.data.regencies);
        setDataRegencies(res.data.regencies);
        setIsDisabledRegency(false);
      })
      .catch(error => console.error(error));
  };

  const handleFilter = () => {
    keyword.length > 0
      ? dispatch({type: 'SET_KEYWORD', keyword: keyword})
      : dispatch({type: 'SET_KEYWORD', keyword: ''});
    selectedLocation != null
      ? dispatch({type: 'SET_LOCATION_ID', locationId: selectedLocation})
      : dispatch({type: 'SET_LOCATION_ID', locationId: null});
    selectedProvince != null
      ? dispatch({type: 'SET_PROVINCE_ID', provinceId: selectedProvince})
      : dispatch({type: 'SET_PROVINCE_ID', provinceId: null});
    selectedRegency != null
      ? dispatch({type: 'SET_REGENCY_ID', regencyId: selectedRegency})
      : dispatch({type: 'SET_REGENCY_ID', regencyId: null});
    navigation.navigate('StackBeranda');
  };

  const handleReset = () => {
    setKeyword('');
    setSelectedLocation(null);
    setSelectedProvince(null);
    setSelectedRegency(null);
    dispatch({type: 'SET_KEYWORD', keyword: ''});
    dispatch({type: 'SET_LOCATION_ID', locationId: null});
    dispatch({type: 'SET_PROVINCE_ID', provinceId: null});
    dispatch({type: 'SET_REGENCY_ID', regencyId: null});
  };

  return (
    <Box my={2} mx={3}>
      <Box>
        <Text>Keyword</Text>
        <Input
          size="xs"
          mt={1}
          py={1}
          placeholder="Keyword Item"
          onChangeText={setKeyword}
          value={keyword}
        />
      </Box>
      <Box mt={2}>
        <Text>Lokasi</Text>
        <Select
          size="xs"
          py={1}
          selectedValue={selectedLocation}
          accessibilityLabel="Pilih Lokasi"
          placeholder="Pilih Lokasi"
          _selectedItem={{
            bg: 'teal.600',
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={itemValue => setSelectedLocation(itemValue)}>
          {dataLocations.map(data => (
            <Select.Item key={data.id} label={data.name} value={data.id} />
          ))}
        </Select>
      </Box>
      <Box mt={2}>
        <Text>Provinsi</Text>
        <Select
          size="xs"
          py={1}
          selectedValue={selectedProvince}
          accessibilityLabel="Pilih Provinsi"
          placeholder="Pilih Provinsi"
          _selectedItem={{
            bg: 'teal.600',
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={itemValue => {
            setSelectedProvince(itemValue);
            setSelectedRegency(null);
            fetchRegencies(itemValue);
          }}>
          {dataProvinces.map(data => (
            <Select.Item key={data.id} label={data.name} value={data.id} />
          ))}
        </Select>
      </Box>
      <Box mt={2}>
        <Text>Kota/Kabupaten</Text>
        <Select
          size="xs"
          py={1}
          isDisabled={isDisabledRegency}
          selectedValue={selectedRegency}
          accessibilityLabel="Pilih Kota/Kabupaten"
          placeholder="Pilih Kota/Kabupaten"
          _selectedItem={{
            bg: 'teal.600',
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={itemValue => setSelectedRegency(itemValue)}>
          {dataRegencies.map(data => (
            <Select.Item key={data.id} label={data.name} value={data.id} />
          ))}
        </Select>
      </Box>
      <HStack mt="5">
        <Button flex={1} mr="1" colorScheme="red" onPress={handleReset}>
          Reset
        </Button>
        <Button flex={1} ml="1" colorScheme="cyan" onPress={handleFilter}>
          Filter
        </Button>
      </HStack>
    </Box>
  );
};

export default ModalFilter;
