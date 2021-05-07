import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  MenuScreen,
  AboutScreen,
  ContactScreen,
  EditProfileScreen,
  ChangePasswordScreen,
} from '.././../containers';
import { Colors } from './../../theme'

const Stack = createStackNavigator();

const MenuStack = () => (
  <Stack.Navigator 
  screenOptions={{
    headerStyle: {},
    headerTintColor: Colors.mainColor,
    headerTitleStyle: {},
  }}
  initialRouteName="Menu">
    <Stack.Screen name="Menu" component={MenuScreen} />
    <Stack.Screen name="About" component={AboutScreen} />
    <Stack.Screen name="Contact" component={ContactScreen} />
    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
  </Stack.Navigator>
);

export default MenuStack;
