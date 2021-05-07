import {Alert, Image, ImageBackground, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import React, {PureComponent} from "react";
import TabItem from "./TabItem";
import {tabBar} from "./../../../src/constants/images"

class TabBar extends PureComponent {


    handleOnPress = (routeName) => {
        this.props.navigation.navigate(routeName)
    }

    render() {

        const {navigation}  = this.props;

        const {routes, index} = this.props.navigation.state;

        //console.log(this.props.navigation);

        const itemsList = routes.map((route, i) => {
           return (
               <TabItem style={styles.item} key={route.routeName} {...route} handleOnPress={(routeName) => this.handleOnPress(routeName)} isActive={index === i} />
           )
        });

        return (
            <View style={styles.container}>
              {itemsList}
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEE',
        height: 60,
        flexDirection: "row"
    },

    item: {
        flex: 1
    }

});

export default TabBar;