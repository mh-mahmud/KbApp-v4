import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import ImageDetail from '../components/ImageDetail';

const ImageScreen = (props) => {

  return (
    <View>
      <ImageDetail title="Forest" imageSource={require('../../assets/forest.jpg')} score={9} />
      <ImageDetail title="Beach" imageSource={require('../../assets/beach.jpg')} score={7} />
      <ImageDetail title="Mountain" imageSource={require('../../assets/mountain.jpg')} score={8} />
      <ImageDetail title="Hotel" imageSource={require('../../assets/hotel.jpg')} score={10} />
    </View>
  );

};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default ImageScreen;
