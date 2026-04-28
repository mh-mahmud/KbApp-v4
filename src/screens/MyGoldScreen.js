import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, Button, ActivityIndicator } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import AsyncStorage from '@react-native-community/async-storage';

export default class MyGoldScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
          tableHead: ['Head', 'Head2', 'Head3', 'Head4'],
          goldData: [
          ['Your Gold:', '71347'],
          ['Karatbars ID', '71347'],
          ['E-mail', 'dummy.276240@karatbars.com'],
          ['Mobile phone', '+4901717761611'],
          ['Company', 'sns'],
          ['VAT reg. no', 'sns2176'],
          ['Member Since', '19-02-2011'],
          ['Last login time', '2020-01-16 10:16:24 (Server Time)']
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
        const url = 'http://192.168.1.120/api/user_gold_data.php?userId='+user;
        console.log(url);
        const response = await fetch(url);
        const data = await response.json();
        this.setState({
            person: data.results,
            loading: false,
            tableHead: ['Head', 'Head2', 'Head3', 'Head4'],
            goldData: [
                ['Your Gold:', data.results.one_grams],
                ['Payplan gold', data.results.grams_gold],
                ['Gold pool:', data.results.commission_grams],
                ['Cashgold:', data.results.payplan_grams],
                ['1g gold:', data.results.twoandhalf_grams],
                ['2.5g gold:', data.results.five_grams],
                ['5g gold:', data.results.cashgold],
                ['Total pending gold:', data.results.grams_silver],
                ['Today\'s gold price:', '€ 66.90 /gram'],
                ['Your gold value:', '€ 541.89'],
            ],
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
        <Text style={styles.textStyle}>Gold Information</Text>
        <Table borderStyle={{borderWidth: 2, borderColor: '#ececec'}}>
          <Rows data={state.goldData} textStyle={styles.text}/>
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
