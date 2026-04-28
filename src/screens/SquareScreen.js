import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, Button } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import AsyncStorage from '@react-native-community/async-storage';

export default class SquareScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tableHead: ['Head', 'Head2', 'Head3', 'Head4'],
      accountData: [
        ['Username', '71347'],
        ['Karatbars ID', '71347'],
        ['E-mail', 'dummy.276240@karatbars.com'],
        ['Mobile phone', '+4901717761611'],
        ['Company', 'sns'],
        ['VAT reg. no', 'sns2176'],
        ['Member Since', '19-02-2011'],
        ['Last login time', '2020-01-16 10:16:24 (Server Time)']
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
      ]
    }
  }

  render() {
    const state = this.state;

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
