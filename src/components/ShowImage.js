import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';

const ShowImage = ({ imageSource }) => {
  return (
    <View>
      <Image source={imageSource} />
    </View>
  );
};

export default ShowImage;