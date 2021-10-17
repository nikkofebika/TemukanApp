import {
    Box,
    Button,
    HStack,
    Image,
    ScrollView,
    Spinner,
    Text,
    VStack,
    Modal,
    Alert,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { API_URL } from '../config/const/url';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const DetailItem = ({ route }) => {
    const { itemId, itemName } = route.params;
    const [item, setItem] = useState([]);
    const [dataClaim, setDataClaim] = useState([]);
    const [loadingButtonClaim, setLoadingButtonClaim] = useState(false);
    const [showButtonClaim, setShowButtonClaim] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [imgUrl, setImgUrl] = useState('');
    useEffect(() => {
        fetch(API_URL + 'items/get/' + itemId)
            .then(response => response.json())
            .then(res => {
                console.log(res.data);
                setItem(res.data.item);
            })
            .catch(error => console.error(error));
    }, []);

    const handleKlaim = id => {
        setLoadingButtonClaim(true);
        fetch(API_URL + 'items/claim', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                item_id: id,
                insert: 1,
            }),
        })
            .then(response => response.json())
            .then(res => {
                console.log(res.data);
                res.success && setShowButtonClaim(false);
                setDataClaim(res.data);
                setLoadingButtonClaim(false);
            })
            .catch(error => console.error(error));
    };

    const handleShowModal = url => {
        setImgUrl(url);
        setModalVisible(!modalVisible);
    };

    const RenderClaim = () => {
        if (dataClaim.length == 0) {
            return null;
        } else {
            if (dataClaim.user_name != '') {
                return (
                    <Alert status="success" my={2} mx={3} shadow={3} borderRadius="md">
                        <VStack space={1} flexShrink={1} w="100%">
                            <Alert.Icon size="md" alignSelf="center" />
                            <VStack
                                _text={{
                                    textAlign: 'center',
                                }}>
                                <Text
                                    bold
                                    textAlign="center"
                                    _dark={{
                                        color: 'coolGray.800',
                                    }}>
                                    Item berhasil di klaim
                                </Text>
                                <Text
                                    bold
                                    textAlign="center"
                                    _dark={{
                                        color: 'coolGray.800',
                                    }}>
                                    Silahkan hubungi kontak dibawah ini
                                </Text>
                            </VStack>
                            <Box
                                _dark={{
                                    _text: {
                                        color: 'coolGray.600',
                                    },
                                }}>
                                <Text fontSize="xs">
                                    <Text bold fontSize="xs">
                                        Nama
                                    </Text>
                                    {'            '}: {dataClaim.user_name}
                                </Text>
                                <Text fontSize="xs">
                                    <Text bold fontSize="xs">
                                        Email
                                    </Text>
                                    {'            '}: {dataClaim.user_email}
                                </Text>
                                <Text fontSize="xs">
                                    <Text bold fontSize="xs">
                                        No. Telepon
                                    </Text>{' '}
                                    : {dataClaim.user_phone}
                                </Text>
                                <Text fontSize="xs">
                                    <Text bold fontSize="xs">
                                        Alamat
                                    </Text>
                                    {'          '}: {dataClaim.user_address}
                                </Text>
                            </Box>
                        </VStack>
                    </Alert>
                );
            } else {
                return (
                    <Alert status="error" my={2} mx={3} shadow={3} borderRadius="md">
                        <VStack space={2} flexShrink={1} w="100%">
                            <HStack space={2} flexShrink={1}>
                                <Alert.Icon mt="1" />
                                <Text fontSize="md" color="coolGray.800">
                                    Gagal klaim item
                                </Text>
                            </HStack>
                        </VStack>
                    </Alert>
                );
            }
        }
    };

    if (item.length == 0) {
        return <Spinner />;
    }
    return (
        <>
            <Box my={2} mx={3} shadow={3} bg="white" borderRadius="md">
                <Modal isOpen={modalVisible} onClose={setModalVisible}>
                    <Modal.Content>
                        <Modal.CloseButton />
                        <Modal.Body>
                            <Image
                                source={{
                                    uri: imgUrl,
                                }}
                                alt={imgUrl}
                                style={{ width: windowWidth, height: windowHeight * 0.5 }}
                            />
                        </Modal.Body>
                    </Modal.Content>
                </Modal>
                <Box p={2}>
                    <HStack justifyContent="space-between" alignItems="center">
                        <Text bold>{itemName}</Text>
                        <Text fontSize="xs">
                            Tgl. Reg :{' '}
                            <Text bold fontSize="xs" color="red.700">
                                {item.created_at}
                            </Text>
                        </Text>
                    </HStack>
                    <HStack justifyContent="space-around" alignItems="center">
                        <VStack alignItems="center">
                            <Text fontSize="xs">Model</Text>
                            <Text fontSize="xs" bold>
                                {item.model}
                            </Text>
                        </VStack>
                        <VStack alignItems="center">
                            <Text fontSize="xs">Tgl. Temu</Text>
                            <Text fontSize="xs" bold>
                                {item.find_date}
                            </Text>
                        </VStack>
                        <VStack alignItems="center">
                            <Text fontSize="xs">Warna</Text>
                            <Text fontSize="xs" bold>
                                {item.color}
                            </Text>
                        </VStack>
                    </HStack>
                    <Text fontSize="xs">
                        Tipe :{' '}
                        <Text fontSize="xs" bold>
                            {item.item_type_name}
                        </Text>
                    </Text>
                    <Text fontSize="xs">
                        Lokasi :{' '}
                        <Text fontSize="xs" bold>
                            {item.location}
                        </Text>
                    </Text>
                    <Text fontSize="xs">
                        Detail :{' '}
                        <Text fontSize="xs" bold>
                            {item.specific_location}
                        </Text>
                    </Text>
                    <Text fontSize="xs">
                        Provinsi :{' '}
                        <Text fontSize="xs" bold>
                            {item.province_name}
                        </Text>
                    </Text>
                    <Text fontSize="xs">
                        Kota/Kab :{' '}
                        <Text fontSize="xs" bold>
                            {item.regency_name}
                        </Text>
                    </Text>
                    <Text fontSize="xs">
                        Kecamatan :{' '}
                        <Text fontSize="xs" bold>
                            {item.district_name}
                        </Text>
                    </Text>
                    <Text fontSize="xs">
                        Kelurahan :{' '}
                        <Text fontSize="xs" bold>
                            {item.village_name}
                        </Text>
                    </Text>
                </Box>
                <Box>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} my="2">
                        {item.images.map(img => (
                            <TouchableOpacity key={img} onPress={() => handleShowModal(img)}>
                                <Image
                                    resizeMode="cover"
                                    source={{
                                        uri: img,
                                    }}
                                    alt={img}
                                    size="lg"
                                />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </Box>
                {showButtonClaim && (
                    <Button
                        isLoading={loadingButtonClaim ? true : false}
                        isLoadingText="Loading"
                        py={3}
                        bg="gray.200"
                        borderRadius={0}
                        onPress={() => handleKlaim(itemId)}>
                        Klaim
                    </Button>
                )}
            </Box>
            <RenderClaim />
        </>
    );
};

export default DetailItem;
