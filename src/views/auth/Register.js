import React, {Component} from 'react';
import {
    Image,
    View,
    ImageBackground,
    Text,
    TextInput,
    TouchableOpacity,
    Animated,
    ScrollView,
    Alert,
    KeyboardAvoidingView,
    Platform, Dimensions
} from 'react-native';
import {images} from "../../constants/images";
import SocialLogin from "../../components/SocialLogin";
import {authStyles} from "../../styles/auth";
import {colors} from "../../styles/colors";
import {NavigationServices} from "../../api/NavigationService";
import {ActivityIndicator} from "react-native"
import {registerURL, storeDataToAsyncStorage} from "./../../config";
import axios from "axios";
import {getCurrentUser} from "../../store/actions/authUserActions";
import {connect} from "react-redux";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class Register extends Component {
    state = {
        position: new Animated.Value(0),
        name: null,
        email: null,
        mobile: null,
        password: null,
        loading: false,
    };


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
            case "password":
                this.setState({
                    password: text
                });
                break;
            default:
            //
        }
    };


    componentDidMount() {
        this.positionAnimation();
        this.props.getCurrentUser();
    };

    positionAnimation = () => {
        Animated.timing(this.state.position, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start();
    };


    handleSignUp = () => {
        if (this.state.name === null || this.state.name === "") {
            Alert.alert("Validation Error", "Name is required");
        } else if (this.state.email === null || this.state.email === "") {
            Alert.alert("Validation Error", "Email is required")
        } else if (this.state.mobile === null || this.state.mobile === "") {
            Alert.alert("Validation Error", "Mobile is required")
        } else if (this.state.password === null || this.state.password === "") {
            Alert.alert("Validation Error", "Password is required or not valid")
        } else {
            this.setState({
                loading: true,
            });
            axios.post(registerURL, this.state).then(response => {
                this.setState({
                    loading: false,
                });
                switch (response.data.Error.code) {
                    case 21:
                        //console.log("axios res", response)
                        // cache token
                        storeDataToAsyncStorage("token", JSON.stringify(response.data.Error.token)).then(res => {
                            //console.log("Async success token", res);
                            // cache user
                            storeDataToAsyncStorage("user", JSON.stringify(response.data.Response)).then(res => {
                                //console.log("Async success user", res);
                                this.props.getCurrentUser();

                                NavigationServices.navigate("Home");
                            }).catch(err => {
                                //console.log("Async error user", err);
                            });
                        }).catch(err => {
                            //console.log("Async error token", err);
                        });
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
                console.log("error", err);
                this.setState({
                    loading: false,
                });
                Alert.alert("Connection Error", "Check Your Internet Connection")
            })
        }
    };


    render() {
        const {width, height} = Dimensions.get('window');

        const logoTranslate = this.state.position.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 0],
        });
        return (

            <ImageBackground style={authStyles.background} source={images.splashBg} imageStyle={{resizeMode: 'cover'}}>



                <ScrollView contentContainerStyle={{flexGrow: 1, position: "absolute", zIndex: 3, width: width}}>
                    <KeyboardAwareScrollView enableOnAndroid={true}>
                        {/*<KeyboardAvoidingView style={{flex: 1}} behivor="position" enabled>*/}

                        <Animated.View style={[authStyles.header, {transform: [{translateY: logoTranslate}]}]}>
                            <Image source={images.logoSplash}/>
                            <Image source={images.slogan}/>
                        </Animated.View>

                        <View style={authStyles.form}>
                            {
                                this.state.loading ?
                                    <ActivityIndicator color={colors.mainColor}
                                                       style={authStyles.activityIndicator}/> : null
                            }
                            {/*<ScrollView*/}
                            {/*contentContainerStyle={{flexGrow: 1, justifyContent: "center", alignItems: "center"}}*/}
                            {/*showsVerticalScrollIndicator={false}>*/}


                            <Text style={authStyles.form_title}>Sign Up</Text>

                            <TextInput placeholder="Name"
                                       placeholderTextColor="#FFF"
                                       onChangeText={(text) => this.handleInputOnChange(text, "name")}
                                       style={authStyles.input}
                                       autoCapitalize="none"
                                       autoCorrect={false}/>
                            <TextInput placeholder="Email"
                                       placeholderTextColor="#FFF"
                                       onChangeText={(text) => this.handleInputOnChange(text, "email")}
                                       style={authStyles.input}
                                       autoCapitalize="none"
                                       autoCorrect={false}
                                       keyboardType="email-address"/>
                            <TextInput placeholder="Mobile"
                                       placeholderTextColor="#FFF"
                                       onChangeText={(text) => this.handleInputOnChange(text, "mobile")}
                                       keyboardType="phone-pad" style={authStyles.input}
                                       autoCapitalize="none"
                                       autoCorrect={false}/>
                            <TextInput placeholder="Password"
                                       placeholderTextColor="#FFF"
                                       onChangeText={(text) => this.handleInputOnChange(text, "password")}
                                       secureTextEntry={true} style={authStyles.input}
                                       autoCapitalize="none"
                                       autoCorrect={false}/>
                            <TouchableOpacity style={authStyles.button} onPress={() => this.handleSignUp()}>
                                <Text adjustsFontSizeToFit={true} numberOfLines={1}
                                      style={authStyles.button_text}>Register</Text>
                            </TouchableOpacity>
                            <Text onPress={() => {
                                NavigationServices.navigate("Login")
                            }} adjustsFontSizeToFit={true} numberOfLines={1}
                                  style={[colors.white, {
                                      textAlign: "center",
                                      marginTop: 20,
                                      marginBottom: 20,
                                      textTransform: "capitalize"
                                  }]}>
                                Already have an account ?
                                <Text adjustsFontSizeToFit={true} numberOfLines={1}
                                      style={{textTransform: "capitalize"}}
                                >&nbsp;Login</Text>
                            </Text>
                            <Text onPress={() => NavigationServices.navigate("Home")}
                                  style={[colors.white, {fontWeight: "bold", textAlign: "center",}]}>Continue As
                                Guest</Text>
                            {/*</ScrollView>*/}
                        </View>
                        {/*</KeyboardAvoidingView>*/}
                    </KeyboardAwareScrollView>

                </ScrollView>
            </ImageBackground>


        )
    }
}


const mapStateToProps = state => {
    return {}
};


const mapDispatchToProps = dispatch => {
    return {
        getCurrentUser: () => dispatch(getCurrentUser())
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Register);
