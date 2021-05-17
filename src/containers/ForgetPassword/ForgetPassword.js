import React, {Component} from 'react';
import {Alert, TextInput, Animated, Dimensions} from 'react-native';
import {NavigationServices} from '../../api/NavigationService';
import {authStyles} from '../../styles/auth';
import axios from 'axios';
import {forgetPasswordURL} from '../../config';
import AuthContainer from './../../components/AuthContainer/AuthContainer';

class ForgetPassword extends Component {
  state = {
    position: new Animated.Value(0),
    email: null,
    loading: false,
  };

  componentDidMount() {
    this.positionAnimation();
  }

  positionAnimation = () => {
    Animated.timing(this.state.position, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  handleForgetPassword = () => {
    if (this.state.login === null) {
      Alert.alert('Validation Error', 'Email or mobile is required');
    } else {
      this.setState({
        loading: true,
      });
      axios
        .post(forgetPasswordURL, this.state)
        .then(response => {
          this.setState({
            loading: false,
          });
          console.log(response, 'pppp');
          switch (response.data.Error.code) {
            case 20:
              Alert.alert('Success', 'An email sent to you email account', [
                {
                  text: 'OK',
                  onPress: () => NavigationServices.navigate('Login'),
                },
              ]);
              break;
            case 22: // validation
              if (response.data.Error) {
                Alert.alert('Validation Error', response.data.Error.desc);
              }
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

  handleInputOnChange = (text, type) => {
    switch (type) {
      case 'email':
        this.setState({
          email: text,
        });
        break;
      default:
      //
    }
  };

  render() {
    const logoTranslate = this.state.position.interpolate({
      inputRange: [0, 1],
      outputRange: [50, 0],
    });

    return (
      <AuthContainer
        title="Forget Password"
        canGoBack={this.props.navigation.canGoBack()}
        onPressMainButton={this.handleForgetPassword}
        mainButtonText="Submit"
        secondaryTextLink="Already have account ? SIGN-IN"
        onPressSecondaryLink={() => NavigationServices.navigate('Login')}
        tertiaryTextLink="Continue As GUEST"
        onPressTertiaryLink={() =>
          NavigationServices.reset(0, [{name: 'Main'}])
        }
        isLoading={this.state.isLoading}>
        <TextInput
          onChangeText={text => this.handleInputOnChange(text, 'email')}
          placeholder="Email"
          placeholderTextColor="#FFF"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          style={authStyles.input}
        />
      </AuthContainer>
    );
  }
}

export default ForgetPassword;
