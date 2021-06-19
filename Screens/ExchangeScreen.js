import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import db from '../Config';
import firebase from 'firebase';


export default class Request extends React.Component {
  constructor() {
    super();
    this.state = {
      reason: '',
      itemName: '',
      userId: firebase.auth().currentUser.email,
    };
  }

  addRequest = (itemName, reason) => {
    var userId = this.state.userId;
    var requestId = this.createUniqueId();

    db.collection('ExchangeRequest').add({
      user_Id: userId,
      request_Id: requestId,
      item_Name: itemName,
      reason: reason,
    });
    this.setState({ itemName: '', reason: '' });
    Alert.alert('Item Has Been Requested Successfully');
  };

  createUniqueId = () => {
    return Math.random().toString(36).substring(7);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>

        <KeyboardAvoidingView>
          <TextInput
            placeholder="Enter Item"
            onChangeText={(text) => {
              this.setState({ itemName: text });
            }}
            style={styles.inputBox}
            value={this.state.itemName}></TextInput>

          <TextInput
            placeholder="Enter Reason to Request Item"
            onChangeText={(text) => {
              this.setState({ reason: text });
            }}
            style={styles.inputBox}
            value={this.state.reason}></TextInput>

          <TouchableOpacity
            style={styles.requestBTN}
            onPress={() => {
              this.addRequest(this.state.itemName, this.state.reason);
            }}>
            <Text>Request</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  inputBox: {
    width: 300,
    height: 50,
    borderWidth: 5,
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '10%',
  },
  requestBTN: {
    backgroundColor: '#154fe6',
    height: 50,
    width: 100,
    marginLeft: 100,
    margingTop: 100,
    padding: 20,
  },
});
