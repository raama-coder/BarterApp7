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
import firebase from 'firebase';

import { DrawerItems } from 'react-navigation-drawer';

export default class SideDrawer extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.drawerContainer}>
          <DrawerItems {...this.props}></DrawerItems>
        </View>
        <View style={styles.logoutContainer}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {
              this.props.navigation.navigate('Welcome');
              firebase.auth().signOut();
            }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerContainer: {
    flex: 0.8,
    paddingTop: 30,
  },
  logoutContainer: {
    flex: 0.2,
    justifyContent: 'flex-end',
    paddingBottom: 30,
  },
});
