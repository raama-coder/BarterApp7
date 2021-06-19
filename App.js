import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import Welcome from './Screens/WelcomeScreen';
import {AppTabNavigator} from './components/AppTabNavigator';
import {DrawerNavigator} from "./components/AppDrawerNavigator"

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const SwitchNavigator = createSwitchNavigator({
  Welcome: { screen: Welcome },
  DrawerNavigator: { screen: DrawerNavigator },
});

const AppContainer = createAppContainer(SwitchNavigator);
