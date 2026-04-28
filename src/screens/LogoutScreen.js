import React, { Component } from 'react';
import { Text, View, Button, AsyncStorage } from 'react-native';

export default class LogoutScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button title="Logout" onPress={
            async() => {
                await AsyncStorage.clear();
                this.props.navigation.navigate('Auth');
            }
        } />
      </View>
    );
  }

}