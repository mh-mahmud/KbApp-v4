import React, { Component } from 'react';
import { Button, StyleSheet, View, Text, ActivityIndicator, StatusBar } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AsyncStorage from '@react-native-community/async-storage';

import HomeScreen from './src/screens/HomeScreen';
import ComponentsScreen from './src/screens/ComponentsScreen';
import ListScreen from './src/screens/ListScreen';
import CounterScreen from './src/screens/CounterScreen';
import ColorScreen from './src/screens/ColorScreen';
import SquareScreen from './src/screens/SquareScreen';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';

const Rootnavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Components: ComponentsScreen,
    List: ListScreen,
    Counter: CounterScreen,
    Color: ColorScreen,
    Square: SquareScreen,
    Dashboard: DashboardScreen
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none'
  }
);

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none'
  }
);

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._loadData();
  }

  render() {
    return(
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }

  _loadData = async() => {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    console.log(isLoggedIn);
    this.props.navigation.navigate(isLoggedIn !== '1' ? 'Auth' : 'App');
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: Rootnavigator,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);
