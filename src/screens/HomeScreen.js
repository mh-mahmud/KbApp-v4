import React, { Component } from 'react';
import { Text, StyleSheet, Button, View, TouchableOpacity, Image, Dimensions, SafeAreaView, Alert } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import { DrawerActions } from 'react-navigation-drawer';
import AsyncStorage from '@react-native-community/async-storage';

import DashboardScreen from './DashboardScreen';
import MyGoldScreen from './MyGoldScreen';
import ProfileScreen from './ProfileScreen';

//Navigation Drawer Structure for all screen
class NavigationDrawerStructure extends React.Component {
	//Top Navigation Header with Donute Button
	toggleDrawer = () => {
	  //Props to open/close the drawer
	  this.props.navigationProps.toggleDrawer();
	};
	render() {
	  return (
		<View style={{ flexDirection: 'row' }}>
		  <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
			{/*Donute Button Image */}
			<Image
			  source={require('../../image/drawer.png')}
			  style={{ width: 40, height: 40, marginLeft: 5 }}
			/>
		  </TouchableOpacity>
		</View>
	  );
	}
}

//Stack Navigator for the First Option of Navigation Drawer
const FirstActivity_StackNavigator = createStackNavigator({
	//All the screen from the First Option will be indexed here
	First: {
	  screen: ProfileScreen,
	  navigationOptions: ({ navigation }) => ({
		headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
			backgroundColor: '#3a9ad3'
		  },
		  headerTitle: 'View Profile',
		  headerTintColor: '#fff',
		  headerTitleStyle: {
			fontWeight: 'bold',
			textAlign: 'center',
			flex: 1,
		  },
	  }),
	},
});

//Stack Navigator for the First Option of Navigation Drawer
const Home_StackNavigator = createStackNavigator({
	//All the screen from the First Option will be indexed here
	Second: {
	  screen: DashboardScreen,
	  navigationOptions: ({ navigation }) => ({
		headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
			backgroundColor: '#3a9ad3'
		  },
		  headerTitle: 'Dashboard',
		  headerTintColor: '#fff',
		  headerTitleStyle: {
			fontWeight: 'bold',
			textAlign: 'center',
			flex: 1,
		  },
	  }),
	},
});

  //Stack Navigator for the First Option of Navigation Drawer
const MyGold_StackNavigator = createStackNavigator({
	//All the screen from the First Option will be indexed here
	Third: {
	  screen: MyGoldScreen,
	  navigationOptions: ({ navigation }) => ({
		title: 'Demo Screen 1',
		headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
        headerStyle: {
			backgroundColor: '#3a9ad3'
		  },
		  headerTitle: 'My Gold',
		  headerTintColor: '#fff',
		  headerTitleStyle: {
			fontWeight: 'bold',
			textAlign: 'center',
			flex: 1,
		  },
	  }),
	},
});


const MyDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: Home_StackNavigator
    },
    Profile: {
      screen: FirstActivity_StackNavigator
    },
    MyGold: {
      screen: MyGold_StackNavigator
	}
  },
  
  {
    contentComponent:(props) => (
      <View style={styles.menuStyle}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerNavigatorItems  {...props} />
            <TouchableOpacity onPress={()=>
              Alert.alert(
                'Log out',
                'Do you want to logout?',
                [
                  {text: 'Cancel', onPress: () => {return null}},
                  {text: 'Confirm', onPress: () => {
                    AsyncStorage.clear();
                    props.navigation.navigate('Auth')
                  }},
                ],
                { cancelable: false }
              )  
            }>
              <Text style={{margin: 16,fontWeight: 'bold'}}>Logout</Text>
            </TouchableOpacity>
          </SafeAreaView>
      </View>
    ),
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'
  },
  {
    drawerWidth: Dimensions.get('window').width - 130,
  }
);

class HomeScreen extends Component {

	toggleDrawer = () => {
		//Props to open/close the drawer
		this.props.navigationProps.toggleDrawer();
	};

	render() {
		return (
			<View style={styles.container}>
				<Text>Welcome to Dashboard</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuStyle: {
	flex: 1,
	justifyContent: 'flex-start',
	marginTop: 20
  }
});

export default createAppContainer(MyDrawerNavigator);
