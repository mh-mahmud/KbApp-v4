import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, Button, ActivityIndicator } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import AsyncStorage from '@react-native-community/async-storage';

export default class ProfileScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
          tableHead: ['Head', 'Head2', 'Head3', 'Head4'],
          accountData: [
            ['Your Gold:', '71347'],
            ['Karatbars ID', '71347'],
            ['E-mail', 'dummy.276240@karatbars.com'],
            ['Mobile phone', '+4901717761611'],
            ['Company', 'sns'],
            ['VAT reg. no', 'sns2176'],
          ],
          personalData: [
            ['First name', '71347'],
            ['Last name', 'Last Name'],
            ['Date of birth', '06 November 1984'],
            ['Address', 'Wallstreet 20'],
            ['City', 'Stuttgart'],
            ['ZIP', '1209'],
            ['State', 'Stutgart'],
            ['Country', 'Germany']
          ],
            loading: true,
            person: null
        }
    }

    state = {
        loading: true,
        person: null
    }

    async componentDidMount() {
        let user = await AsyncStorage.getItem('userId');
        const url = 'http://192.168.1.120/api/user_profile_data.php?userId='+user;
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();
        this.setState({
            person: data.results,
            loading: false,
            tableHead: ['Head', 'Head2', 'Head3', 'Head4'],
            accountData: [
                ['Username:', data.results.username],
                ['Karatbars ID:', data.results.ref_no],
                ['E-mail:', data.results.email],
                ['Mobile phone:', data.results.phone],
                ['Company:', data.results.company],
                ['VAT reg. no:', data.results.company_id],
                ['Member Since:', data.results.date_register ],
                ['Last login time:', 'N/A'],
            ],
            personalData: [
                ['First name', data.results.firstname],
                ['Last name', data.results.name],
                ['Date of birth', data.results.birthdate],
                ['Address', data.results.address],
                ['City', data.results.city],
                ['ZIP', data.results.zip],
                ['State', data.results.state],
                ['Country', data.results.country]
            ]
        });
    }

  render() {
    const state = this.state;

    if(state.loading) {
        return(
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator />
            </View>
        );
    }

    return (
      <ScrollView style={styles.container}>
      <View>
        <Text style={styles.textStyle}>Account Information</Text>
        <Table borderStyle={{borderWidth: 2, borderColor: '#ececec'}}>
          <Rows data={state.accountData} textStyle={styles.text}/>
        </Table>
      </View>

      <View style={styles.viewDesign}>
        <Text style={styles.textStyle}>Personal Details</Text>
        <Table borderStyle={{borderWidth: 2, borderColor: '#ececec'}}>
          <Rows data={state.personalData} textStyle={styles.text}/>
        </Table>
      </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  viewDesign: {
    marginTop: 30,
    marginBottom: 70
  },
  textStyle: {
    padding: 10,
    height: 40,
    backgroundColor: 'steelblue',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});
