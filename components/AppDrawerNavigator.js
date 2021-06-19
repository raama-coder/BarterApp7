import * as React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator';
import SideDrawerMenu from './SideBarMenu';
import Settings from '../Screens/Settings';
import MyBarters from '../Screens/MyBarters';

export const DrawerNavigator = createDrawerNavigator(
  {
    Home: { screen: AppTabNavigator },
    Settings: { screen: Settings },
    Barters: { screen: MyBarters },
  },
  { contentComponent: SideDrawerMenu },
  { initialRouteName: 'Home' }
);
