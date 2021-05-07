import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { Colors } from './../../theme'
import {
  HomeScreen,
  ProductsScreen,
  ProductDetailsScreen,
} from '.././../containers';

const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {},
      headerTintColor: Colors.mainColor,
      headerTitleStyle: {},
    }}
    initialRouteName="Home">
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Products" component={ProductsScreen} />
    <Stack.Screen
      name="ProductDetails"
      options={{title: 'Product Details'}}
      component={ProductDetailsScreen}
    />
  </Stack.Navigator>
);

export default HomeStack;
