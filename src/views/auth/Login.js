import React, {Component} from 'react';
import {
  Image,
  View,
  Alert,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {Images} from '../../theme/images';
// import {NavigationServices} from "../../api/NavigationService";
import {authStyles} from '../../styles/auth';
import {colors} from '../../styles/colors';
import axios from 'axios';
// import {loginURL, storeDataToAsyncStorage} from "../../config";
// import {clearCart, getShoppingCart} from "../../store/actions/cartActions";
// import {getCurrentUser} from "../../store/actions/authUserActions";
import {connect} from 'react-redux';
// NavigationActions
const {width, height} = Dimensions.get('window');

class Login extends Component {
  state = {
    position: new Animated.Value(0),
    login: null,
    password: null,
    loading: false,
  };

  handleLogin = () => {
    // if (this.state.login === null || this.state.name === "") {
    //     Alert.alert("Validation Error", "Email or mobile is required");
    // } else if (this.state.password === null || this.state.password === "") {
    //     Alert.alert("Validation Error", "Password is required or not valid")
    // } else {
    //     this.setState({
    //         loading: true,
    //     });
    //     axios.post(loginURL, this.state).then(response => {
    //         console.log(response.data.Error)
    //         this.setState({
    //             loading: false,
    //         });
    //         switch (response.data.Error.code) {
    //             case 20:
    //                 // cache token
    //                 storeDataToAsyncStorage("token", JSON.stringify(response.data.Error.token)).then(res => {
    //                     console.log("Async success token", res);
    //                     // cache user
    //                     storeDataToAsyncStorage("user", JSON.stringify(response.data.Response)).then(res => {
    //                         this.props.getCurrentUser();
    //                         NavigationServices.navigate("Home");
    //                     }).catch(err => {
    //                         console.log("Async error user", err);
    //                     });
    //                 }).catch(err => {
    //                     console.log("Async error token", err);
    //                 });
    //                 break;
    //             case 22: // validation
    //                 if (response.data.Error) {
    //                     Alert.alert("Validation Error", response.data.Error.desc)
    //                 }
    //                 break;
    //             case 24: // validation
    //                 if (response.data.Error.validation) {
    //                     Alert.alert("Validation Error", response.data.Error.validation[Object.keys(response.data.Error.validation)[0]][0])
    //                 }
    //                 break;
    //             default:
    //             //
    //         }
    //     }).catch(err => {
    //         console.log("error", err);
    //         this.setState({
    //             loading: false,
    //         });
    //         Alert.alert("Connection Error", "Check Your Internet Connection")
    //     })
    // }
  };

  componentDidMount() {
    // this.positionAnimation();
    // this.props.getCurrentUser();
  }

  positionAnimation = () => {
    Animated.timing(this.state.position, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  handleInputOnChange = (text, type) => {
    switch (type) {
      case 'login':
        this.setState({
          login: text,
        });
        break;
      case 'password':
        this.setState({
          password: text,
        });
        break;
      default:
      //
    }
  };

  render() {
    const {width, height} = Dimensions.get('window');

    const logoTranslate = this.state.position.interpolate({
      inputRange: [0, 1],
      outputRange: [50, 0],
    });

    return (
      <ImageBackground style={authStyles.background} source={images.splashBg}>
        {/* Flex 2  */}
        <View style={{ backgroundColor: '#333', height: 100, width: 100 }}>
          <Image source={Images.logoSplash} />
          <Image source={Images.slogan} />
        </View>

        {/* Flex 3  */}
        <View style={authStyles.form}>
          {this.state.loading ? (
            <ActivityIndicator
              color={colors.mainColor}
              style={authStyles.activityIndicator}
            />
          ) : null}

          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            showsVerticalScrollIndicator={false}>
            <Text style={authStyles.form_title}>Sign In</Text>
            <TextInput
              onChangeText={text => this.handleInputOnChange(text, 'login')}
              placeholder="Phone Number Or Email"
              placeholderTextColor="#FFF"
              autoCapitalize="none"
              autoCorrect={false}
              onTe
              style={authStyles.input}
            />
            <TextInput
              onChangeText={text => this.handleInputOnChange(text, 'password')}
              placeholder="Password"
              placeholderTextColor="#FFF"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              style={authStyles.input}
            />
            <TouchableOpacity
              style={authStyles.button}
              onPress={() => this.handleLogin()}>
              <Text
                adjustsFontSizeToFit={true}
                numberOfLines={1}
                style={authStyles.button_text}>
                Login
              </Text>
            </TouchableOpacity>
            <Text
              onPress={() => NavigationServices.navigate('ForgetPassword')}
              style={[colors.white, {marginTop: 15, textAlign: 'center'}]}>
              Forget Password ?
            </Text>
            <Text
              onPress={() => {
                NavigationServices.navigate('Register');
              }}
              adjustsFontSizeToFit={true}
              numberOfLines={1}
              style={[
                colors.white,
                {
                  marginTop: 15,
                  textAlign: 'center',
                  marginBottom: 15,
                  textTransform: 'capitalize',
                },
              ]}>
              Don't Have an account ?
              <Text
                adjustsFontSizeToFit={true}
                numberOfLines={1}
                style={{textTransform: 'capitalize'}}>
                &nbsp;Sign Up
              </Text>
            </Text>
            <Text
              onPress={() => NavigationServices.navigate('Home')}
              style={[colors.white, {fontWeight: 'bold', textAlign: 'center'}]}>
              Continue As Guest
            </Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    getShoppingCart: () => dispatch(getShoppingCart()),
    clearCart: () => dispatch(clearCart()),
    getCurrentUser: () => dispatch(getCurrentUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
