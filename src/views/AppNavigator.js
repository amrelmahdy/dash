import React from "react";
import {
    createAppContainer,
    createBottomTabNavigator,
    createStackNavigator,
    createSwitchNavigator,
} from "react-navigation";

import Login from "./auth/Login";
import Register from "./auth/Register";
import ForgetPassword from "./auth/ForgetPassword";

import Home from "./home/Home";
import Cart from "./cart/Cart";
import Menu from "./menu/Menu";
import Notifications from "./notifications/Notifications";

import Splash from "./Splash";

import {tabBar} from "../constants/images";
import ProductsDetails from "./home/ProductDetails";

import Edit from "./menu/Edit";
import About from "./menu/About";
import Settings from "./menu/Settings";
import ChangePassword from "./menu/ChangePassword";
import Contact from "./menu/Contact";
import TabBarIcon from "../components/TabBarIcon";
import Products from "./home/Products";
import Search from "./search/Search";
import {Icon} from "react-native-elements";

const AuthNavigator = createStackNavigator(
    {
        Login: {
            screen: Login,
        },
        Register: {
            screen: Register,
        },
        ForgetPassword: {
            screen: ForgetPassword,
        }
    },
    {
        defaultNavigationOptions: {
            header: null
        },

    },
);


const HomeStack = createStackNavigator(
    {
        Home: Home,
        Products: Products,
        ProductDetails: ProductsDetails
    },
    {
        defaultNavigationOptions: {
            headerBackTitle: 'Back',
            headerTintColor: '#ea0a2a',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    }
);
const SearchStack = createStackNavigator(
    {
        Search: Search,
        SearchProductDetails: ProductsDetails
    },
    {
        defaultNavigationOptions: {
            headerBackTitle: 'Back',
            headerStyle: {
                backgroundColor: '#FFF',
            },
            headerTintColor: '#ea0a2a',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    }
);

const CartStack = createStackNavigator(
    {
        Cart: {
            screen: Cart,
        },
    },
    {
        defaultNavigationOptions: {
            headerBackTitle: 'Back',
            headerStyle: {
                backgroundColor: '#FFF',
            },
            headerTintColor: '#ea0a2a',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    }
);


const NotificationsStack = createStackNavigator(
    {
        Notifications: Notifications,
        NotificationDetails: ProductsDetails,
        // Notifications: {
        //     screen: Notifications,
        // },
    },
    {
        defaultNavigationOptions: {
            headerBackTitle: 'Back',
            headerStyle: {
                backgroundColor: '#FFF',
            },
            headerTintColor: '#ea0a2a',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    }
);


const MenuStack = createStackNavigator(
    {
        Menu: Menu,
        Edit: Edit,
        About: About,
        Contact: Contact,
        Settings: Settings,
        ChangePassword: ChangePassword
    },
    {
        defaultNavigationOptions: {
            headerBackTitle: 'Back',
            headerStyle: {
                backgroundColor: '#FFF',
            },
            headerTintColor: '#ea0a2a',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    }
);

const TabNavigator = createBottomTabNavigator({
        Home: HomeStack,
        Search: SearchStack,
        Cart: CartStack,
        Notifications: NotificationsStack,
        Menu: MenuStack,
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, horizontal, tintColor}) => {
                const {routeName} = navigation.state;
                let icon = tabBar[focused ? "active" : "inactive"][routeName];
                // You can return any component that you like here!
                return <TabBarIcon routeName={routeName} tintColor={tintColor} icon={icon}/>;
            },
        }),

        tabBarOptions: {
            showLabel: true, // hide labels
            activeTintColor: '#ea0a2a', // active icon color
            inactiveTintColor: '#bebebe',  // inactive icon color
            style: {
                backgroundColor: '#FFF' // TabBar background
            }
        }
    }
);


const MainNavigator = createStackNavigator(
    {
        Tab: TabNavigator,
    },
    {
        mode: "modal",
        defaultNavigationOptions: {
            header: null,
        },

    },
);


const AppNavigator = createSwitchNavigator(
    {
        Splash: {
            screen: Splash
        },
        Auth: AuthNavigator,
        Main: MainNavigator,
    },
    {
        initialRouteName: "Splash"
    }
);


export default createAppContainer(AppNavigator);