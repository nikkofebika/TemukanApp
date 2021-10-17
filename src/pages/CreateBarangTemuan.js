import React, {useState, useEffect} from 'react';
import {
  Box,
  Button,
  CheckIcon,
  FormControl,
  Input,
  ScrollView,
  Select,
  useToast,
  VStack,
  Text,
  Icon,
  TextArea,
} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Platform, Pressable} from 'react-native';
import {API_URL} from '../config/const/url';
import {getColorList} from '../utils/generalUtil';

export const CreateBarangTemuan = () => {
  const [name, setName] = useState({value: '', error: false});
  const [tglTemu, setTglTemu] = useState({value: '', error: false});
  const [jenisBarang, setJenisBarang] = useState({value: '', error: false});
  const [modelBarang, setModelBarang] = useState({value: '', error: false});
  const [tag, setTag] = useState({value: '', error: false});
  const [warna, setWarna] = useState({value: '', error: false});
  const [deskripsi, setDeskripsi] = useState({value: '', error: false});
  const [gambar, setGambar] = useState({value: '', error: false});
  const [lokasiSpesifik, setLokasiSpesifik] = useState({
    value: '',
    error: false,
  });
  const [selectedLocation, setSelectedLocation] = useState({
    value: '',
    error: false,
  });
  const [selectedProvince, setSelectedProvince] = useState({
    value: '',
    error: false,
  });
  const [selectedRegency, setSelectedRegency] = useState({
    value: '',
    error: false,
  });
  const [selectedDistrict, setSelectedDistrict] = useState({
    value: '',
    error: false,
  });
  const [selectedVillage, setSelectedVillage] = useState({
    value: '',
    error: false,
  });

  const [dataJenisBarang, setDataJenisBarang] = useState([]);
  const [dataLocations, setDataLocations] = useState([]);
  const [dataProvinces, setDataProvinces] = useState([]);
  const [dataRegencies, setDataRegencies] = useState([]);
  const [dataDistricts, setDataDistricts] = useState([]);
  const [dataVillages, setDataVillages] = useState([]);
  const [isDisabledRegency, setIsDisabledRegency] = useState(true);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [loadingButton, setLoadingButton] = useState(false);
  const toast = useToast();
  const id = 'toast-id';

  useEffect(() => {
    fetchJenisBarang();
    fetchLocations();
  }, []);

  const fetchJenisBarang = () => {
    fetch(API_URL + 'item-types')
      .then(response => response.json())
      .then(res => {
        setDataJenisBarang(res.data.item_types);
      })
      .catch(error => console.log('error fetch jenis barang', error));
  };

  const fetchLocations = () => {
    fetch(API_URL + 'others/locations')
      .then(response => response.json())
      .then(res => {
        setDataLocations(res.data.locations);
      })
      .catch(error => console.log('error fetch locations', error));
  };

  const validate = () => {
    let rtn = true;
    if (name.value.length <= 0) {
      setName({...name, error: true});
      rtn = false;
    } else {
      setName({...name, error: false});
      rtn = true;
    }

    if (tglTemu.value.length <= 0) {
      setTglTemu({...tglTemu, error: true});
      rtn = false;
    } else {
      setTglTemu({...tglTemu, error: false});
      rtn = true;
    }

    if (jenisBarang.value.length <= 0) {
      setJenisBarang({...jenisBarang, error: true});
      rtn = false;
    } else {
      setJenisBarang({...jenisBarang, error: false});
      rtn = true;
    }
    return rtn;
  };

  const handleSubmit = async () => {
    if (validate()) {
      setLoadingButton(true);
      let signup = await authContext.signUp(
        name.value,
        tglTemu.value,
        jenisBarang.value,
      );
      console.log('res signup', signup);
      if (!signup.success) {
        if (!toast.isActive(id)) {
          toast.show({
            id,
            title: 'Registrasi gagal',
            status: 'warning',
            description: 'tglTemu sudah digunakan',
          });
        }
      }
      setLoadingButton(false);
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || tglTemu;
    console.log('selectedDate', selectedDate);
    console.log('currentDate', currentDate);
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      '-' +
      (tempDate.getMonth() + 1) +
      '-' +
      tempDate.getFullYear();
    let fixDate =
      fDate + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes();
    setTglTemu({...tglTemu, value: fixDate});
  };

  return (
    <ScrollView
      safeArea
      p={2}
      w="98%"
      mx="auto"
      showsVerticalScrollIndicator={false}>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
        />
      )}
      <FormControl mt={2} isInvalid={name.error}>
        <FormControl.Label
          _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
          Nama Barang
        </FormControl.Label>
        <Input
          size="sm"
          p="1"
          value={name.value}
          onChangeText={e => setName({...name, value: e})}
        />
        {name.error && (
          <FormControl.ErrorMessage>Nama wajib diisi!</FormControl.ErrorMessage>
        )}
      </FormControl>
      <FormControl mt={2} isInvalid={tglTemu.error}>
        <FormControl.Label
          _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
          Tanggal Menemukan
        </FormControl.Label>
        <Pressable
          onPress={() => {
            setShow(true);
          }}>
          <Input
            size="sm"
            p="1"
            isReadOnly={true}
            value={tglTemu.value}
            InputRightElement={
              <Icon
                as={<Ionicons name="calendar" />}
                size={5}
                mr="2"
                color="muted.400"
              />
            }
            placeholder="Password"
          />
        </Pressable>
        {tglTemu.error && (
          <FormControl.ErrorMessage>
            Tanggal wajib diisi!
          </FormControl.ErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={jenisBarang.error}>
        <FormControl.Label
          _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
          Jenis Barang
        </FormControl.Label>
        <Select
          size="xs"
          py={1}
          selectedValue={jenisBarang}
          accessibilityLabel="Pilih jenis barang"
          placeholder="Pilih jenis barang"
          _selectedItem={{
            bg: 'teal.600',
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={itemValue => setJenisBarang(itemValue)}>
          {dataJenisBarang.map(data => (
            <Select.Item key={data.id} label={data.name} value={data.id} />
          ))}
        </Select>
        {jenisBarang.error && (
          <FormControl.ErrorMessage>
            Jenis barang wajib diisi!
          </FormControl.ErrorMessage>
        )}
      </FormControl>
      <FormControl mt={2} isInvalid={modelBarang.error}>
        <FormControl.Label
          _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
          Model
        </FormControl.Label>
        <Input
          size="sm"
          p="1"
          onChangeText={e => setModelBarang({...modelBarang, value: e})}
        />
        {modelBarang.error && (
          <FormControl.ErrorMessage>
            Model barang wajib diisi!
          </FormControl.ErrorMessage>
        )}
      </FormControl>
      <FormControl mt={2} isInvalid={tag.error}>
        <FormControl.Label
          _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
          Tag
        </FormControl.Label>
        <Input size="sm" p="1" onChangeText={e => setTag({...tag, value: e})} />
        {tag.error && (
          <FormControl.ErrorMessage>
            Tag barang wajib diisi!
          </FormControl.ErrorMessage>
        )}
      </FormControl>
      <FormControl mt={2} isInvalid={warna.error}>
        <FormControl.Label
          _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
          Warna
        </FormControl.Label>
        <Select
          size="xs"
          py={1}
          selectedValue={warna}
          accessibilityLabel="Pilih warna"
          placeholder="Pilih warna"
          _selectedItem={{
            bg: 'teal.600',
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={e => setWarna(e)}>
          {getColorList().map((data, i) => (
            <Select.Item key={i} label={data} value={data} />
          ))}
        </Select>
        {warna.error && (
          <FormControl.ErrorMessage>
            Warna barang wajib diisi!
          </FormControl.ErrorMessage>
        )}
      </FormControl>
      <FormControl mt={2}>
        <FormControl.Label
          _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
          Deskripsi
        </FormControl.Label>
        <TextArea
          numberOfLines={4}
          placeholder="Deskripsi barang"
          isInvalid={deskripsi.error}
          onChangeText={e => setDeskripsi({...deskripsi, value: e})}
        />
        {deskripsi.error && (
          <FormControl.ErrorMessage>
            Deskripsi barang wajib diisi!
          </FormControl.ErrorMessage>
        )}
      </FormControl>
      <VStack my={3}>
        <Text bold>Lokasi Penemuan</Text>
        <Box border={1} borderColor="gray.400" borderRadius="sm" p={2}>
          <FormControl isInvalid={selectedProvince.error}>
            <FormControl.Label
              _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
              Provinsi
            </FormControl.Label>
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
              onValueChange={itemValue => {
                setSelectedProvince(itemValue);
                setSelectedRegency(null);
                fetchRegencies(itemValue);
              }}>
              {dataProvinces.map(data => (
                <Select.Item key={data.id} label={data.name} value={data.id} />
              ))}
            </Select>
            {selectedProvince.error && (
              <FormControl.ErrorMessage>
                {selectedProvince.msg}
              </FormControl.ErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={selectedRegency.error}>
            <FormControl.Label
              _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
              Kota/Kabupaten
            </FormControl.Label>
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
            {selectedRegency.error && (
              <FormControl.ErrorMessage>
                {selectedRegency.msg}
              </FormControl.ErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={selectedDistrict.error}>
            <FormControl.Label
              _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
              Kecamatan
            </FormControl.Label>
            <Select
              size="xs"
              py={1}
              isDisabled={isDisabledRegency}
              selectedValue={selectedDistrict}
              accessibilityLabel="Pilih Kecamatan"
              placeholder="Pilih Kecamatan"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue => setSelectedDistrict(itemValue)}>
              {dataDistricts.map(data => (
                <Select.Item key={data.id} label={data.name} value={data.id} />
              ))}
            </Select>
            {selectedDistrict.error && (
              <FormControl.ErrorMessage>
                {selectedDistrict.msg}
              </FormControl.ErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={selectedVillage.error}>
            <FormControl.Label
              _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
              Kelurahan
            </FormControl.Label>
            <Select
              size="xs"
              py={1}
              isDisabled={isDisabledRegency}
              selectedValue={selectedVillage}
              accessibilityLabel="Pilih Kelurahan"
              placeholder="Pilih Kelurahan"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="5" />,
              }}
              mt={1}
              onValueChange={itemValue => setSelectedVillage(itemValue)}>
              {dataVillages.map(data => (
                <Select.Item key={data.id} label={data.name} value={data.id} />
              ))}
            </Select>
            {selectedVillage.error && (
              <FormControl.ErrorMessage>
                {selectedVillage.msg}
              </FormControl.ErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={selectedLocation.error}>
            <FormControl.Label
              _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
              Lokasi
            </FormControl.Label>
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
            {selectedLocation.error && (
              <FormControl.ErrorMessage>
                {selectedLocation.msg}
              </FormControl.ErrorMessage>
            )}
          </FormControl>
          <FormControl mt={2} isInvalid={lokasiSpesifik.error}>
            <FormControl.Label
              _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
              Lokasi Spesifik
            </FormControl.Label>
            <Input
              size="xs"
              p="1"
              onChangeText={e =>
                setLokasiSpesifik({...lokasiSpesifik, value: e})
              }
            />
            {lokasiSpesifik.error && (
              <FormControl.ErrorMessage>
                Lokasi wajib diisi!
              </FormControl.ErrorMessage>
            )}
          </FormControl>
        </Box>
      </VStack>
      <Button
        mb={5}
        isLoading={loadingButton}
        isLoadingText="Loading..."
        colorScheme="cyan"
        _text={{color: 'white'}}
        onPress={handleSubmit}>
        Register
      </Button>
    </ScrollView>
  );
};
