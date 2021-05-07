import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  LoginScreen,
  RegisterScreen,
  ForgetPasswordScreen,
} from '.././../containers';

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator headerMode="none" initialRouteName="Login">
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
  </Stack.Navigator>
);

export default AuthStack;
