import React, {Component} from 'react';
import {
    ScrollView,
    View,
    Image,
    ListView,
    FlatList,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Button,
    Text, Alert, StatusBar, Platform
} from 'react-native';
import {changePasswordURL, editProfileURL, getHeader, storeDataToAsyncStorage} from "../../config";
import axios from "axios";
import {NavigationServices} from "../../api/NavigationService";
import {colors} from "../../styles/colors";

class ChangePassword extends Component {

    state = {
        old_password: null,
        new_password: null,
        confirm_new_password: null,
        loading: false,
    }
    componentWillMount() {
        this.props.navigation.setParams({changePasswordSubmission: this.changePasswordSubmission});
    }

    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};
        return {
            title: 'Change Password',
            headerRight: (
                <View style={{marginRight: 20}}>
                    <TouchableOpacity onPress={() => params.changePasswordSubmission()}>
                        <Text style={[colors.red, {fontWeight: "bold", fontSize: 17}]}>Save</Text>
                    </TouchableOpacity>
                </View>
            ),
        }
    };
    changePasswordSubmission = () => {
        getHeader().then(header => {
            if(this.state.new_password.length < 6){
                Alert.alert('Validation', "The new password must be at least 6 characters")
            }else if(this.state.new_password !== this.state.confirm_new_password){
                Alert.alert('Validation', "Confirm password doesn't match")
            }else{
                axios.post(changePasswordURL, this.state, {headers: header}).then(response => {
                    this.setState({
                        loading: false,
                    });
                    console.log(response)
                    switch (response.data.Error.code) {
                        case 20:
                            Alert.alert("success", "password changed successfully")
                            NavigationServices.navigate("Menu");
                            break;
                        case 24: // validation
                            if (response.data.Error.validation) {
                                Alert.alert("Validation Error", response.data.Error.validation[Object.keys(response.data.Error.validation)[0]][0])
                            }
                            break;
                        case 23: // validation
                            if (response.data.Error.validation) {
                                Alert.alert("Validation Error", response.data.Error.validation[Object.keys(response.data.Error.validation)[0]][0])
                            }
                            break;
                        default:
                        //
                    }
                }).catch(err => {
                    console.log("error", err)
                })
            }

        }).catch(err => {
            console.log("Unable to get header", err)
            Alert.alert("Whoops", "Something went wrong")
        })

    };

    handleOninputChange = (type, text) => {
        switch (type) {
            case "old_password":
                this.setState({
                    old_password: text
                });
                break;
            case "new_password":
                this.setState({
                    new_password: text
                });
                break;
             case "confirm_new_password":
                  this.setState({
                      confirm_new_password: text
                  });
                  break;
            default:
            //

        }
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}/>
                <ScrollView contentContainerStyle={{
                    minHeight: 100,
                }} showsVerticalScrollIndicator={false}
                            style={styles.scrollView}>
                    <View style={styles.view}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Old Password"
                            secureTextEntry={true}
                            onChangeText={(text) => this.handleOninputChange("old_password", text)}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="New Password"
                            secureTextEntry={true}
                            onChangeText={(text) => this.handleOninputChange("new_password", text)}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Confirm New Password"
                            secureTextEntry={true}
                            onChangeText={(text) => this.handleOninputChange("confirm_new_password", text)}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#c7c7c7",
        flex: 1
    },
    scrollView: {
        width: "90%",
        marginLeft: "5%",
        marginTop: "5%",
        marginBottom: "5%",
        borderRadius: 15,
        backgroundColor: "#ffffff",
    },
    view: {
        padding: 15,
        paddingTop: 50,
    },
    textInput: {
        height: 40,
        width: "90%",
        padding: 10,
        backgroundColor: "#e9e9ef",
        marginLeft: "5%",
        marginBottom: "5%",
        color: "#606063",
        borderRadius: 10,
    }

});

export default ChangePassword