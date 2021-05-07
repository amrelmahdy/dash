import React, {Component} from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TextInput,
    Alert,
    TouchableOpacity,
    Button,
    StatusBar,
    Platform
} from 'react-native';
import {getDataFromAsyncStorage, loginURL, storeDataToAsyncStorage, editProfileURL, getHeader} from "../../config";
import axios from "axios";
import {NavigationServices} from "../../api/NavigationService";
import {clearCart, getShoppingCart} from "../../store/actions/cartActions";
import {getCurrentUser} from "../../store/actions/authUserActions";
import {connect} from "react-redux";
import {colors} from "../../styles/colors";

class Edit extends Component {
    state = {
        user: null,
        loading: false,
    };


    componentWillMount() {
        getDataFromAsyncStorage("user").then(res => {
            if (res) {
                const user = JSON.parse(res);
                this.setState({
                    user
                })
            }
        }).catch(err => {
            console.log("error getting data from cache", err)
        });

        this.props.navigation.setParams({handleFormSubmission: this.handleFormSubmission});
    }


    handleFormSubmission = async () => {
        getHeader().then(header => {
            axios.post(editProfileURL, this.state.user, {headers: header}).then(response => {
                this.setState({
                    loading: false,
                });
                switch (response.data.Error.code) {
                    case 20:
                        // cache user
                        storeDataToAsyncStorage("user", JSON.stringify(response.data.Response)).then(res => {
                            //console.log("Async success user", res);
                            this.props.getCurrentUser(response.data.Response);
                            NavigationServices.navigate("Menu");
                        }).catch(err => {
                            console.log("Async error user", err);
                        });
                        break;
                    case 22: // validation
                        if (response.data.Error) {
                            Alert.alert("Validation Error", response.data.Error.desc)
                        }
                        break;
                    case 24: // validation
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
        }).catch(err => {
            console.log("Unable to get header", err)
            Alert.alert("Whoops", "Something went wrong")
        })

    };

    static navigationOptions = ({navigation}) => {
        const params = navigation.state.params || {};
        return {
            headerTitle: "Edit",
            headerRight: (
                <View style={{marginRight: 20}}>
                    <TouchableOpacity onPress={() => params.handleFormSubmission()}>
                        <Text style={[colors.red, {fontWeight: "bold", fontSize: 17}]}>Save</Text>
                    </TouchableOpacity>
                </View>
            ),
        }
    };


    handleOninputChange = (type, text) => {
        switch (type) {
            case "name":
                console.log(text);
                this.setState({
                    ...this.state,
                    user: {
                        ...this.state.user,
                        name: text
                    }
                });

                break;
            case "email":
                console.log(text);
                this.setState({
                    ...this.state,
                    user: {
                        ...this.state.user,
                        email: text
                    }
                });

                break;
            case "mobile":
                console.log(text);
                this.setState({
                    ...this.state,
                    user: {
                        ...this.state.user,
                        mobile: text
                    }
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
                            placeholder="Name"
                            onChangeText={(text) => this.handleOninputChange("name", text)}
                            value={this.state.user ? this.state.user.name : null}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Email"
                            onChangeText={(text) => this.handleOninputChange("email", text)}
                            value={this.state.user ? this.state.user.email : null}
                        />
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(text) => this.handleOninputChange("mobile", text)}
                            placeholder="Mobile"
                            value={this.state.user ? this.state.user.mobile : null}
                        />
                        <View style={{position: "relative"}}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Password"
                                secureTextEntry={true}
                                editable={false}
                            />
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('ChangePassword')}
                                              style={{
                                                  position: "absolute",
                                                  top: "25%",
                                                  left: "75%"
                                              }}>
                                <Text style={{
                                    color: "#ea0a2a",
                                    fontSize: 12,
                                }}>Change</Text>
                            </TouchableOpacity>
                        </View>
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


const mapStateToProps = state => {
    const {cart, cartIsLoading} = state.cart;
    return {
        cart, cartIsLoading
    }
};


const mapDispatchToProps = dispatch => {
    return {
        getShoppingCart: () => dispatch(getShoppingCart()),
        clearCart: () => dispatch(clearCart()),
        getCurrentUser: (upUser) => dispatch(getCurrentUser(upUser))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Edit);
