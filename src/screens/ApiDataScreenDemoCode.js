import React, { Component } from 'react';
import { Text, View, ActivityIndicator, Image, AsyncStorage, Button } from 'react-native';

export default class ApiDataScreen extends Component {

    state = {
        loading: true,
        person: null
    }

    async componentDidMount() {
        let user = await AsyncStorage.getItem('userId');
        const url = 'https://api.randomuser.me/';
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();
        this.setState({
            person: data.results[0],
            loading: false
        });
    }

    displayData = async () => {
        try {
            let user = await AsyncStorage.getItem('userId');
            alert(user);
        }
        catch(e) {
            console.log(e);
        }
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
                <Text>Title: {this.state.person.name.title}</Text>
                <Text>Name: {this.state.person.name.first} {this.state.person.name.last}</Text>
                <Image source={{uri: this.state.person.picture.large}} />
                <Button title="Press Me" onPress={this.displayData} />
            </View>
        );

    }
}