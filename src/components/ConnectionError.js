import React from "react"
import {Text, StyleSheet, View, TouchableOpacity, Image} from "react-native";
import Button from "./../components/Button";
import {NavigationServices} from "../api/NavigationService";
import {appColors} from "../styles/colors";
import {Images} from "../theme/images";

const ConnectionError = ({onPress}) => {
    console.log(onPress, "ppp");
    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text style={{fontSize: 15, textTransform: "capitalize", marginBottom: 10}}>Unable to load page content.</Text>
            <Image source={Images.no_internet}/>
            <TouchableOpacity  onPress={() => onPress()} style={{
                backgroundColor: "transparent".red,
                paddingTop: 5,
                paddingBottom: 5,
                paddingLeft: 20,
                paddingRight: 20,
                borderRadius: 5,
                marginLeft: "30%",
                marginRight: "30%",
                marginTop: 20,
                borderWidth: 1,
                borderColor: appColors.red
            }}>
                <Text style={{color: appColors.red, textAlign: "center"}}>Reload</Text>
            </TouchableOpacity>
        </View>
    )
};



const styles = StyleSheet.create({
    container: {
        alignSelf: "stretch",
        padding: 10,
        color: "#FFF"
    },
    text: {
        alignSelf: "center",
        color: "#333",
        fontWeight: "bold",
        borderRadius: 30,
        marginBottom: 10
    }
});


export default ConnectionError;