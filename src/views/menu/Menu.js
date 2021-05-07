import React, {Component} from 'react';
import {Image, Text, View, TouchableOpacity, StyleSheet, StatusBar, Platform, Dimensions} from 'react-native';
import {connect} from "react-redux";
import {menu} from "../../constants/images";
import {ListItem} from 'react-native-elements'
import {getDataFromAsyncStorage, removeItemFromAsyncStorage} from "./../../config"
import {NavigationServices} from "../../api/NavigationService";

import {clearProducts} from "../../store/actions/productActions";
import {clearCategories} from "../../store/actions/categoryActions";
import {logout} from "../../store/actions/authUserActions";
import { StackActions, NavigationActions } from 'react-navigation';
const{ height, width} = Dimensions.get("window");

class Menu extends Component {
    static navigationOptions = {
        title: 'Menu',
    };
    state = {
        isAuth: false,
        user: null,
    };
    menuData = [
        // {
        //     id: 1,
        //     name: "Settings",
        //     image: menu.settings,
        //     route: "Settings",
        // },
        {
            id: 2,
            name: "About us",
            image: menu.about,
            route: "About",
        },
        {
            id: 3,
            name: "Contact us",
            image: menu.contact,
            route: "Contact",
        },
        {
            id: 4,
            name: "Logout",
            image: menu.logout,
            route: "Login",
        }
    ];

    componentWillMount() {



        getDataFromAsyncStorage("user").then(res => {

            console.log("user login ", res);


            if (res) {
                const user = JSON.parse(res);
                this.setState({
                    isAuth: true,
                    user
                })
            }
        }).catch(err => {
            console.log("error getting data from cache", err)
        });
    }

    handlePageNavigation = (route) => {
        if (route === "Login") {

            this.setState(  {
                isAuth: false,
                user: null,
            });

            this.props.logout();

            removeItemFromAsyncStorage("user").then(res => {
                removeItemFromAsyncStorage("token").then(res => {

                    console.log("item has been removed", res)
                }).catch(err => {
                    console.log("error removing item from cache", err)
                });


                console.log("item has been removed", res)
            }).catch(err => {
                console.log("error removing item from cache", err)
            });


            this.props.clearCategories();
            this.props.clearProducts();
        }

        NavigationServices.navigate(route);
    };



    componentDidMount() {




    }

    render() {


        return (


            <View style={{flex: 1, backgroundColor: "rgba(229,229,229, 0.58)"}}>

                <StatusBar barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}/>

                {!this.props.currentUserIsLoading && this.props.currentUser?
                    <View style={{
                        backgroundColor: "#FFF",
                        margin: 15,
                        marginBottom: 0,
                        borderRadius: 10,
                        padding: 10,
                        height: "27%",
                        flexDirection: "column"
                    }}>
                        <View style={{alignItems: "flex-end", flex: .2}}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Edit')}>
                                <Text style={{color: "#ea0a2a", fontWeight: "bold"}}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{justifyContent: "center", alignItems: "center", flex: .8}}>
                            <Image source={menu.profile}/>
                            <Text style={{
                                marginTop: "3%",
                                color: "#ea0a2a",
                                fontWeight: "bold",
                            }}>{this.props.currentUser.name}</Text>
                            <Text style={{marginTop: "3%", color: '#b9b9b9' , marginBottom : Platform.OS === "ios" ? 0 : 20 }}>{this.props.currentUser.email}</Text>
                        </View>
                    </View> : null}

                <View style={{
                    margin: 15,
                    borderRadius: 10,
                    height: this.props.currentUser ? "68%" : "95%",
                    backgroundColor: "#FFF",
                    padding: 10
                }}>
                    {
                        this.menuData.map((item, i) => (
                                <ListItem
                                    key={i}
                                    title={item.name}
                                    leftIcon={<Image source={item.image}/>}
                                    chevron={item.id !== 4}
                                    bottomDivider
                                    onPress={() => this.handlePageNavigation(item.route)}
                                />
                        ))
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({});


const mapStateToProps = state => {
    const {currentUser, currentUserIsLoading} = state.user;
    return {
        currentUser, currentUserIsLoading
    }
};
const mapDispatchToProps = dispatch => {
    return {
        clearProducts: () => dispatch(clearProducts()),
        clearCategories: () => dispatch(clearCategories()),
        logout: () => dispatch(logout())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);