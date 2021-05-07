import React, {Component} from 'react';
import {
    View,
    Text, ScrollView, TextInput, TouchableOpacity, StatusBar, Platform
} from 'react-native';
import {authStyles} from "../../styles/auth";


class Order extends Component {

    handleInputOnChange = (text, type) => {
        switch (type) {
            case "name":
                this.setState({
                    name: text
                });
                break;
            case "email":
                this.setState({
                    email: text
                });
                break;
            case "mobile":
                this.setState({
                    mobile: text
                });
                break;
            default:
            //
        }
    };

    render() {

        return (
            <View style={authStyles.form}>
                <StatusBar barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}/>
                <ScrollView style={{width: "100%"}} showsVerticalScrollIndicator={false}>
                    <Text style={authStyles.form_title}>Contact Info</Text>
                    <TextInput  onChangeText={(text) => this.handleInputOnChange(text, "name")} placeholder="Name ..." onTe style={authStyles.input}/>
                    <TextInput  onChangeText={(text) => this.handleInputOnChange(text, "email")} placeholder="Email ..." onTe style={authStyles.input}/>
                    <TextInput  onChangeText={(text) => this.handleInputOnChange(text, "mobile")} placeholder="Phone ..." onTe style={authStyles.input}/>
                    <TouchableOpacity   style={authStyles.button} onPress={() => this.handleLogin()}>
                        <Text adjustsFontSizeToFit={true} numberOfLines={1}
                              style={authStyles.button_text}>Submit Order</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
}


export default Order;