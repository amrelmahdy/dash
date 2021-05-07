import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {CartScreen} from '.././../containers';
import { Colors } from './../../theme'

const Stack = createStackNavigator();

const CartStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {},
      headerTintColor: Colors.mainColor,
      headerTitleStyle: {},
    }}
    initialRouteName="Cart">
    <Stack.Screen name="Cart" component={CartScreen} />
  </Stack.Navigator>
);

export default CartStack;
