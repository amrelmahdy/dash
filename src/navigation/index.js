import React from 'react';

import {View, Text} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthStack} from './AuthNavigation';
import {
  HomeStack,
  MenuStack,
  SearchStack,
  NotificationStack,
  CartStack,
} from './AppNavigation';

import TabBarIcon from '../components/TabBarIcon';
import {tabBar} from './../theme/images';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SplashScreen} from '../containers';
import {NavigationServices} from './../api/NavigationService';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          const routeName = route.name;
          // if (route.name === 'Home') {
          //   iconName = focused ? 'home' : 'home';
          // } else if (route.name === 'Profile') {
          //   iconName = focused ? 'user' : 'user';
          // }
          let icon = tabBar[focused ? 'active' : 'inactive'][routeName];
          // You can return any component that you like here!
          return (
            <TabBarIcon routeName={routeName} tintColor={color} icon={icon} />
          );
        },
      })}

      
      tabBarOptions={{
        labelStyle: {display: 'none'},
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Search" component={SearchStack} />
      <Tab.Screen name="Cart" component={CartStack} />
      <Tab.Screen name="Notifications" component={NotificationStack} />
      <Tab.Screen name="Menu" component={MenuStack} />
    </Tab.Navigator>
  );
}

const RootNavigator = () => {
  return (
    <Stack.Navigator
      animationEnabled={false}
      mode="modal"
      headerMode="none"
      
      initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen
        name="Auth"
        options={{
          animationEnabled: false,
        }}
        component={AuthStack}
      />
      <Stack.Screen
        name="Main"
        options={{
          animationEnabled: false,
        }}
        component={TabNavigator}
      />
    </Stack.Navigator>
  );
};

// console.log("navigationRef", navigationRef)

function Navigation() {
  return (
    <NavigationContainer
      ref={ref => NavigationServices.setTopLevelNavigator(ref)}>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default Navigation;
