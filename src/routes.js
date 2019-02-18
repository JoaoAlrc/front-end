import { createSwitchNavigator, createStackNavigator, createAppContainer, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation';

import SignIn from './screens/signScreens/signIn';
import SignUp from './screens/signScreens/signUp';
import Main from './screens/main';
import Bar from './screens/tabScreens/bar';
import Delivery from './screens/tabScreens/delivery';
import Party from './screens/tabScreens/party';
import Settings from './screens/drawerScreens/settings';

const signStack = createStackNavigator({
  SignIn,
  SignUp
});

const settingsDrawer = createDrawerNavigator({
  Settings: { screen: Settings }
});

const tapOptionsMenu = createBottomTabNavigator({
  Bar,
  Delivery,
  Party
})

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: { screen: signStack },
  Main: settingsDrawer
})

export default createAppContainer(sign);