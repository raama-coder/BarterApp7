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
import { ListItem, Icon } from 'react-native-elements';
import db from '../Config';
import firebase from 'firebase';

export default class MyBarters extends React.Component {
  constructor() {
    super();
    this.state = {
      donorId: firebase.auth().currentUser.email,
      donorName: '',
      allBarters: [],
    };
    this.requestRef = null;
  }

  getDonorDetails = (donorId) => {
    db.collection('Users')
      .where('Email', '==', this.state.donorId)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          this.setState({
            donorName: doc.data().FirstName + ' ' + doc.data().LastName,
          });
        });
      });
  };

  getAllBarters = () => {
    this.requestRef = db
      .collection('AllBarters')
      .where('userName', '==', this.state.donorId)
      .onSnapshot((snapshot) => {
        var list = snapshot.docs.map((doc) => doc.data());
        this.setState({ allBarters: list });
      });
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => (
    <ListItem key={i} bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.itemName.toString()}</ListItem.Title> 
      </ListItem.Content>
    </ListItem>
  );

  componentDidMount() {
    this.getDonorDetails(this.state.donorId);
    this.getAllBarters();
  }

  componentWillUnmount() {
    this.requestRef();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {this.state.allBarters.length === 0 ? (
            <View>
              <Text style={styles.text}>List Of All Requested Requests</Text>
            </View>
          ) : (
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.allBarters}
              renderItem={this.renderItem}></FlatList>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
