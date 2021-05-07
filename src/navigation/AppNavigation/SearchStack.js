import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SearchScreen, ProductDetailsScreen} from '.././../containers';
import {Colors} from './../../theme';

const Stack = createStackNavigator();

const SearchStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {},
      headerTintColor: Colors.mainColor,
      headerTitleStyle: {},
    }}
    initialRouteName="Search">
    <Stack.Screen name="Search" component={SearchScreen} />
    <Stack.Screen
      name="SearchProductDetails"
      options={{title: 'Product Details'}}
      component={ProductDetailsScreen}
    />
  </Stack.Navigator>
);

export default SearchStack;
