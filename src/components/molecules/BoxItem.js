import React from 'react';
import { Box, Button, Divider, HStack, Text, VStack, Input } from 'native-base';
import { API_URL } from '../../config/const/url';

const BoxItem = (props) => {
  const handleKlaim = (id) => {
    alert('klaim ' + id)
    // fetch(API_URL + 'items/' + id, {
    //   method: 'DELETE',
    //   headers: {
    //     Accept: 'application/json',
    //   }
    // }).then(response => response.json())
    //   .then(res => {
    //     console.log(res.data);
    //   })
    //   .catch(error => console.error(error));
  }

  const handleDelete = (id) => {
    fetch(API_URL + 'items/' + id, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
      }
    }).then(response => response.json())
      .then(res => {
        console.log(res.data);
      })
      .catch(error => console.error(error));
  }
  return (
    <Box my={2} mx={3} shadow={3} bg="white" borderRadius="md">
      <Box p={2}>
        <HStack justifyContent="space-between" alignItems="center">
          <Text bold>{props.itemName}</Text>
          <Text fontSize="xs">
            Tgl. Reg : <Text bold fontSize="xs" color="red.700">{props.createdAt}</Text>
          </Text>
        </HStack>
        <HStack justifyContent="space-around" alignItems="center">
          <VStack alignItems="center">
            <Text fontSize="xs">Model</Text>
            <Text fontSize="xs" bold>{props.model}</Text>
          </VStack>
          <VStack alignItems="center">
            <Text fontSize="xs">Tgl. Temu</Text>
            <Text fontSize="xs" bold>{props.findDate}</Text>
          </VStack>
          <VStack alignItems="center">
            <Text fontSize="xs">Warna</Text>
            <Text fontSize="xs" bold>{props.color}</Text>
          </VStack>
        </HStack>
        <Text fontSize="xs">
          Lokasi : <Text fontSize="xs" bold>{props.location}</Text>
        </Text>
        <Text fontSize="xs">
          Detail : <Text fontSize="xs" bold>{props.specificLocation}</Text>
        </Text>
        <Text fontSize="xs">
          Wilayah : <Text fontSize="xs" bold>{props.region}</Text>
        </Text>
      </Box>
      <HStack justifyContent="space-evenly" bg="gray.200" py={1}>
        <Button
          width="50%"
          bg="gray.200"
          onPress={props.clickDetail}>
          Detail
        </Button>
        <Button
          width="50%"
          bg="gray.200"
          onPress={() => handleKlaim(props.id)}>
          Klaim
        </Button>
      </HStack>
    </Box>
  );
};

export default BoxItem;
