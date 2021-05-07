import {Alert, Image, ImageBackground, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import React, {PureComponent} from "react";
import {tabBar} from "../../constants/images";

class TabItem extends PureComponent {

    render() {
        const {routeName, isActive, handleOnPress} = this.props;
        const icon = tabBar[isActive ? "active" : "inactive" ][routeName];

        const itemColor = isActive ? "#ea0a2a" : "#bebebe";

        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <TouchableOpacity style={{flex: 1, justifyContent: "center", alignItems: "center"}} onPress={() => handleOnPress(routeName)}>
                    <Image source={icon} style={{ marginTop: 5}}/>
                    <Text style={{color: itemColor, marginTop: 5}}>{ routeName }</Text>
                </TouchableOpacity>
            </View>
        )
    }
};



export default TabItem;