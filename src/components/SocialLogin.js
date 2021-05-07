import {Alert, Image, Text, View, TouchableOpacity} from "react-native";
import {images} from "../constants/images";
import React from "react";
//import {facebookAPI} from "../api/Facebook";
import {authStyles} from "../styles/auth";
import {appColors, colors} from "../styles/colors";
import {NavigationServices} from "../api/NavigationService";
import { SocialIcon } from 'react-native-elements'



class SocialLogin extends React.Component {

    handleFacebookLogin = async () => {
      /*  //Alert.alert("Login", "Login With facebook");
        try{
            const token = await facebookAPI.facebookLogin();
            console.log("token", token)
        } catch (error) {
            console.log("error", error)
        }*/
    };


    handleTwitterLogin = () => {
        Alert.alert("Login", "Login With Twitter");
    };


    render() {
        return (
            <View style={authStyles.footer}>
              {/*  <View style={{ flex: 1, alignItems:"center" }}>
                    <Text style={[colors.white]}>
                        Or Login With
                    </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: "space-between", width: "50%", marginLeft: "25%", marginRight: "25%"}}>
                    <TouchableOpacity  onPress={() => this.handleFacebookLogin()}>
                       <Image  source={images.facebookLogin}/>
                        <SocialIcon
                            style={{backgroundColor: "transparent"}}
                            iconColor="white"
                            type='facebook'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.handleTwitterLogin()}>
                       <Image  source={images.twitterLogin}/>
                        <SocialIcon
                            iconColor="white"
                            type='google'
                        />
                    </TouchableOpacity>
                </View>*/}
                {/*<View style={{ flex: 1, alignItems:"center" }}>*/}
                    <Text  onPress={() => NavigationServices.navigate("Home") } style={[colors.white,{fontWeight: "bold"}]}>Continue As
                        Guest</Text>
                {/*</View>*/}
            </View>
        )
    }
}



export default SocialLogin;

