import React from 'react';
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
import {NavigationServices} from '../../api/NavigationService';
import styles from './Register.Styles';
import {colors} from '../../styles/colors';
import {setCurrentUser} from '../../store/actions/userActions';
import {connect} from 'react-redux';
import {login} from './../../api/loginServices';
import {storeItemToAsyncStorage} from './../../api/helpers';
import {registerURL, storeDataToAsyncStorage} from "./../../config";
import axios from "axios";

import AuthContainer from './../../components/AuthContainer/AuthContainer';
const {width, height} = Dimensions.get('window');

class Register extends React.Component {
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
      case 'name':
        this.setState({
          name: text,
        });
        break;
      case 'email':
        this.setState({
          email: text,
        });
        break;
      case 'mobile':
        this.setState({
          mobile: text,
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

  handleSignUp = () => {
    if (this.state.name === null || this.state.name === '') {
      Alert.alert('Validation Error', 'Name is required');
    } else if (this.state.email === null || this.state.email === '') {
      Alert.alert('Validation Error', 'Email is required');
    } else if (this.state.mobile === null || this.state.mobile === '') {
      Alert.alert('Validation Error', 'Mobile is required');
    } else if (this.state.password === null || this.state.password === '') {
      Alert.alert('Validation Error', 'Password is required or not valid');
    } else {
      this.setState({
        loading: true,
      });
      axios
        .post(registerURL, this.state)
        .then(response => {
          this.setState({
            loading: false,
          });
          switch (response.data.Error.code) {
            case 21:
              //console.log("axios res", response)
              // cache token
              storeItemToAsyncStorage(
                '@auth-token',
                JSON.stringify(response.data.Error.token),
              )
                .then(() => {
                  console.log('Async success token');
                  //cache user
                  storeItemToAsyncStorage(
                    '@auth-user',
                    JSON.stringify(response.data.Response),
                  )
                    .then(() => {
                      console.log('success');
                      // Alert('success');
                      this.props.setCurrentUser(response.data.Response);
                      NavigationServices.navigate('Main');
                    })
                    .catch(err => {
                      console.log('Async error user', err);
                    });
                })
                .catch(err => {
                  console.log('Async error token', err);
                });

              break;
            case 24: // validation
              if (response.data.Error.validation) {
                Alert.alert(
                  'Validation Error',
                  response.data.Error.validation[
                    Object.keys(response.data.Error.validation)[0]
                  ][0],
                );
              }
              break;
            default:
            //
          }
        })
        .catch(err => {
          console.log('error', err);
          this.setState({
            loading: false,
          });
          Alert.alert('Connection Error', 'Check Your Internet Connection');
        });
    }
  };
  render() {
    return (
      <AuthContainer
        title="Sign Up"
        mainButtonText="Sign Up"
        canGoBack={this.props.navigation.canGoBack()}
        primaryTextLink="Forgot Password ?"
        onPressPrimaryLink={() => NavigationServices.navigate('ForgetPassword')}
        secondaryTextLink="Already have account ? SIGN-IN"
        onPressSecondaryLink={() => NavigationServices.navigate('Login')}
        tertiaryTextLink="Continue As GUEST"
        onPressTertiaryLink={() =>
          NavigationServices.reset(0, [{name: 'Main'}])
        }
        onPressMainButton={this.handleSignUp}
        isLoading={this.state.loading}>
        <TextInput
          placeholder="Name"
          placeholderTextColor="#FFF"
          onChangeText={text => this.handleInputOnChange(text, 'name')}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#FFF"
          onChangeText={text => this.handleInputOnChange(text, 'email')}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
        />
        <TextInput
          placeholder="Mobile"
          placeholderTextColor="#FFF"
          onChangeText={text => this.handleInputOnChange(text, 'mobile')}
          keyboardType="phone-pad"
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#FFF"
          onChangeText={text => this.handleInputOnChange(text, 'password')}
          secureTextEntry={true}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </AuthContainer>
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
    setCurrentUser: user => dispatch(setCurrentUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);