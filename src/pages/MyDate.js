import React, {useState} from 'react';
import {View, Button, Image} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
// import dummyImg from '../assets/img/dummy.png';
const dummyImg = require('../assets/img/dummy.png');

const MyDate = () => {
  const [img, setImg] = useState(dummyImg);

  const selectFromGallery = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setImg(image.path);
      console.log('image', image);
    });
  };

  const selectFromCamera = () => {
    ImageCropPicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setImg(image.path);
      console.log('image', image);
    });
  };

  return (
    <View>
      <Image source={img} style={{width: 100, height: 100}} />
      <View>
        <Button onPress={selectFromGallery} title="Select From Gallery" />
      </View>
      <View>
        <Button onPress={selectFromCamera} title="Select From Camera" />
      </View>
    </View>
  );
};
export default MyDate;
