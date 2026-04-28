import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, Button, ActivityIndicator } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import AsyncStorage from '@react-native-community/async-storage';

export default class DashboardScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
          tableHead: ['Head', 'Head2', 'Head3', 'Head4'],
          dashboardData: [
            ['Your Gold:', '71347'],
            ['Karatbars ID', '71347'],
            ['E-mail', 'dummy.276240@karatbars.com'],
            ['Mobile phone', '+4901717761611'],
            ['Company', 'sns'],
            ['VAT reg. no', 'sns2176'],
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
            dashboardData: [
                ['Username:', data.results.username],
                ['Karatbars ID:', data.results.ref_no],
                ['Member type:', 'Affiliate'],
                ['KYC status:', 'Approved'],
                ['Your Unilevel status:', 'Gold Manager'],
                ['Your Dual Status:', 'SILVER'],
                ['Matching Bonus Status', 'Not Eligible'],
                ['Sponsor Name', data.results.sponsor],
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
          <Text style={styles.WelcometextStyle}>Welcome to Dashboard</Text>
        </View>

        <View>
          <Text style={styles.textStyle}>Personal Details</Text>
          <Table borderStyle={{borderWidth: 2, borderColor: '#ececec'}}>
            <Rows data={state.dashboardData} textStyle={styles.text}/>
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
    backgroundColor: '#f7f7f7',
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16
  },
  WelcometextStyle: {
    marginBottom: 80,
    height: 50,
    backgroundColor: '#EFCB60',
    color: '#f7f7f7',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center'
  }
});
