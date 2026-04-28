import React, { Component } from 'react';
import { Text, View, ActivityIndicator, Image, AsyncStorage, Button, StyleSheet } from 'react-native';

export default class ApiDataScreen extends Component {

    state = {
        loading: true,
        person: null
    }

    async componentDidMount() {
        let user = await AsyncStorage.getItem('userId');
        const url = 'http://192.168.1.120/api/user_gold_data.php?userId='+user;
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();
        this.setState({
            person: data.results,
            loading: false
        });
    }

    render() {

        if(this.state.loading) {
            return(
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator />
                </View>
            );
        }

        return(
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text style={styles.textStyle}>Your gold: {this.state.person.grams_gold}</Text>
                <Text>Payplan gold: {this.state.person.one_grams}</Text>
                <Text>Gold pool: {this.state.person.commission_grams}</Text>

                <Text>Cashgold: {this.state.person.commission_grams}</Text>
                <Text>1g gold: {this.state.person.commission_grams}</Text>
                <Text>2.5g gold: {this.state.person.commission_grams}</Text>
                <Text>5g gold: {this.state.person.commission_grams}</Text>
                <Text>Total pending gold: {this.state.person.commission_grams}</Text>
                <Text>Today's gold price: {this.state.person.commission_grams}</Text>
                <Text>Your gold value: {this.state.person.commission_grams}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textStyle: {
      backgroundColor: '#ddd',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      borderColor: '#ddd',
      width: '80%'
    }
  });