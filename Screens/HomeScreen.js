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
  FlatList,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import db from '../Config';
import firebase from 'firebase';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = { requestedRequests: [] };
    this.requestReference = null;
  }

  getRequestList = () => {
    this.requestReference = db
      .collection('ExchangeRequest')
      .onSnapshot((snapshot) => {
        var list = snapshot.docs.map((document) => document.data());
        console.log(list + ' test');
        this.setState({ requestedRequests: list });
      });
  };

  componentDidMount() {
    this.getRequestList();
    console.log(this.state.requestedRequests);
  }

  componentWillUnmount() {
    this.requestReference = null;
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    console.log(item.item_Name.toString());
    return (
      <ListItem key={i} bottomDivider>
        <ListItem.Content>
         <TouchableOpacity style={{paddingLeft:230}}>
            <Text>View</Text>
          </TouchableOpacity>
          <ListItem.Title>{item.item_Name.toString()}</ListItem.Title> 
          <ListItem.Subtitle>{item.reason}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {this.state.requestedRequests.length === 0 ? (
            <View
              style={{
                flex: 1,
                fontSize: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>List Of All Requested Requests</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.requestedRequests}
              renderItem={this.renderItem}></FlatList>
          )}
        </View>
      </View>
    );
  }
}
