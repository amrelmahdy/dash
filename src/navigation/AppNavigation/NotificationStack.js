import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NotificationScreen} from '../../containers';
import { Colors } from './../../theme'

const Stack = createStackNavigator();

const NotificationStack = () => (
  <Stack.Navigator 
  screenOptions={{
    headerStyle: {},
    headerTintColor: Colors.mainColor,
    headerTitleStyle: {},
  }}
  initialRouteName="Notifications">
    <Stack.Screen name="Notifications" component={NotificationScreen} />
  </Stack.Navigator>
);

export default NotificationStack;
