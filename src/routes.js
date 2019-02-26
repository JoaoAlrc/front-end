import React, { Component } from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons'

import { SignIn, SignUp, Main, Splash } from './screens/stackScreens'
import { Bar, Delivery, Party, QRCodeScanner } from './screens/tabScreens';
import { Profile, Settings } from './screens/drawerScreens';

const signStack = createStackNavigator({
  SignIn,
  SignUp
});

const mainStack = createStackNavigator({
  Main
}, {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Icon name="md-menu"
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            size={30} />
        )
      }
    }
  });

const homeTabs = createBottomTabNavigator({
  QRCodeScanner,
  Bar,
  Delivery,
  Party
},
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName
      }
    }
  })

const stackTabs = createStackNavigator({
  Tabs: homeTabs
}, {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Icon name="md-menu"
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            size={30} />
        )
      }
    }
  })

const servicesDrawer = createDrawerNavigator({
  Anúbis: { screen: stackTabs },
  Início: { screen: mainStack }
},
  {
    initialRouteName: "Início"
  });

const AppSwitchNavigator = createSwitchNavigator({
  AuthLoading: Splash,
  App: servicesDrawer,
  Auth: signStack,
},
  {
    initialRouteName: 'AuthLoading',
  })

export default createAppContainer(AppSwitchNavigator);