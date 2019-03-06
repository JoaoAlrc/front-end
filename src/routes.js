import React, { Component } from 'react';
import { Image, TouchableHighlight } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Entypo';

import { SignIn, SignUp, Main } from './screens/stackScreens'
import { Bar, Delivery, Party, QRCodeScanner } from './screens/tabScreens';
import { Profile, Settings } from './screens/drawerScreens';
import { LoginOrApp, ScannerOrBar } from './screens/splashScreens';
import { Essence, Drink, Food } from './screens/modalScreens';

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
          <TouchableHighlight onPress={() => navigation.openDrawer()} >
            <Image
              source={require('../images/white_logo_noName.png')}
              style={{ height: 40, width: 40, marginLeft: 10, marginBottom: 10 }}
            />
          </TouchableHighlight>
        ),
        headerStyle: {
          backgroundColor: '#000'
        }
      }
    }
  });



const TabSwitchNavigator = createSwitchNavigator({
  AuthLoading: ScannerOrBar,
  Scanner: QRCodeScanner,
  Bar,
  Essências: Essence,
  Bebidas: Drink,
  Comidas: Food,
},
  {
    mode: 'modal',
    headerMode: 'none',
  },
  {
    initialRouteName: 'AuthLoading',
  })

const homeTabs = createBottomTabNavigator({
  Bar: {
    screen: TabSwitchNavigator,
    navigationOptions: {
      title: 'Bar',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='ios-beer' color={tintColor} size={24} />
      )
    }
  },
  Delivery: {
    screen: Delivery,
    navigationOptions: {
      title: 'Delivery',
      tabBarIcon: ({ tintColor }) => (
        <Icon2 name='motorbike' color={tintColor} size={24} />
      )
    }
  },
  Festa: {
    screen: Party,
    navigationOptions: {
      title: 'Festa',
      tabBarIcon: ({ tintColor }) => (
        <Icon3 name='megaphone' color={tintColor} size={24} />
      ),
      tabBarColor: '#262626'
    }
  }
}, {
    tabBarOptions: {
      showLabel: false, // hide labels
      activeTintColor: '#FFF',
      style: {
        backgroundColor: '#000' // TabBar background
      }
    }
  }
)

const stackTabs = createStackNavigator({
  Tabs: homeTabs
}, {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <TouchableHighlight onPress={() => navigation.openDrawer()} >
            <Image
              source={require('../images/white_logo_noName.png')}
              style={{ height: 40, width: 40, marginLeft: 10, marginBottom: 10 }}
            />
          </TouchableHighlight>
        ),
        headerStyle: {
          backgroundColor: '#000'
        }
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
  AuthLoading: LoginOrApp,
  App: servicesDrawer,
  Auth: signStack,
},
  {
    initialRouteName: 'AuthLoading',
  })

export default createAppContainer(AppSwitchNavigator);