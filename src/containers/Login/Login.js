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
import {NavigationServices} from '../../api/NavigationService';
import styles from './Login.Styles';
import {colors} from '../../styles/colors';
import {clearCart, getShoppingCart} from '../../store/actions/cartActions';
import {setCurrentUser} from '../../store/actions/userActions';
import {connect} from 'react-redux';
import {login} from './../../api/loginServices';
import {storeItemToAsyncStorage} from './../../api/helpers';
import AuthContainer from './../../components/AuthContainer/AuthContainer';
import axios from 'axios';
const {width, height} = Dimensions.get('window');

class Login extends Component {
  state = {
    position: new Animated.Value(0),
    login: null,
    password: null,
    isLoading: false,
  };

  handleLogin = () => {
    if (this.state.login === null || this.state.name === '') {
      Alert.alert('Validation Error', 'Email or mobile is required');
    } else if (this.state.password === null || this.state.password === '') {
      Alert.alert('Validation Error', 'Password is required or not valid');
    } else {
      this.setState({
        isLoading: true,
      });
      login(this.state.login, this.state.password)
        .then(response => {
          this.setState({
            isLoading: false,
          });

          switch (response.data.Error.code) {
            case 20:
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
            isLoading: false,
          });
          Alert.alert('Connection Error', 'Check Your Internet Connection');
        });
    }
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
      <AuthContainer
        title="Sign In"
        onPressMainButton={this.handleLogin}
        primaryTextLink="Forgot Password ?"
        onPressPrimaryLink={() => NavigationServices.navigate('ForgetPassword')}
        secondaryTextLink="Don't have account ? SIGNUP"
        onPressSecondaryLink={() => NavigationServices.navigate('Register')}
        tertiaryTextLink="Continue As GUEST"
        onPressTertiaryLink={() =>
          NavigationServices.reset(0, [{name: 'Main'}])
        }
        isLoading={this.state.isLoading}>
        <TextInput
          onChangeText={text => this.handleInputOnChange(text, 'login')}
          placeholder="Phone Number Or Email"
          placeholderTextColor="#FFF"
          autoCapitalize="none"
          autoCorrect={false}
          onTe
          style={styles.input}
        />
        <TextInput
          onChangeText={text => this.handleInputOnChange(text, 'password')}
          placeholder="Password"
          placeholderTextColor="#FFF"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          style={styles.input}
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
