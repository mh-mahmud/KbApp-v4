import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Button, Alert } from 'react-native';
import { AsyncStorage } from 'react-native';


class LoginScreen extends Component {

	state = {
		username: "",
		password: ""
	};

	checkLogin() {
		const { username, password } = this.state;
		if( username && password ) {

			fetch('http://192.168.1.120/api/', { method:'POST', body: JSON.stringify({username, password}) })
			.then(res => {
				return res.text();
			})
			.then(res => {
				if(res !== '0') {

					AsyncStorage.setItem('isLoggedIn', '1');
					AsyncStorage.setItem('userId', res);

					this.props.navigation.navigate('Home');
				}
				else {
					Alert.alert('Error', 'Username or Password mismatched', [{
						text: 'Ok'
					}]);
				}
			});
		}
		else {
			Alert.alert('Error', 'Username and Password is required', [{
				text: 'Ok'
			}]);
		}
	}

	render() {
		return (


			      	<View style={styles.container}>

				        <Text style={styles.logo}>Karatbars</Text>
				        <View style={styles.inputView} >
				          <TextInput
				            style={styles.inputText}
				            placeholder="Username"
				            placeholderTextColor="#999"
				            autoCapitalize = 'none'
				            onChangeText={text => this.setState({username:text})}/>
				        </View>
				        <View style={styles.inputView} >
				          <TextInput
				            secureTextEntry
				            style={styles.inputText}
				            placeholder="Password"
				            placeholderTextColor="#999"
				            autoCapitalize = 'none'
										secureTextEntry
				            onChangeText={text => this.setState({password:text})}/>
				        </View>

				        <TouchableOpacity style={styles.loginBtn} onPress={() => this.checkLogin()}>
				        	<Text style={styles.loginText}>LOGIN</Text>
				        </TouchableOpacity>
				        <TouchableOpacity>
				          <Text style={styles.forgot}>Forgot Password?</Text>
				        </TouchableOpacity>

			    	</View>


		);
	}
}

const styles = StyleSheet.create({
  screen: {
    padding:50
  },
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    // color:"#fb5b5a",
    color:"#CAAB78",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    // borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"80%",
    // backgroundColor:"#fb5b5a",
    backgroundColor:"#CAAB78",
    // borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:10,
    marginBottom:10,
  },
  loginText:{
    color:"white"
  }
});

export default LoginScreen;
