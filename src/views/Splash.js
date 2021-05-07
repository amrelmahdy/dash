import React, {Component} from 'react';
import {
  Image,
  View,
  StyleSheet,
  ImageBackground,
  Animated,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import {images} from '../constants/images';
import {
  getDataFromAsyncStorage,
  setNotificationTokenURL,
  getHeader,
} from '../config';
import {clearCart, getShoppingCart} from '../store/actions/cartActions';
import {getCurrentUser} from '../store/actions/authUserActions';
import {connect, Provider} from 'react-redux';
import {
  getNotificationsList,
  setNotificationReadCount,
} from '../store/actions/notificationActions';
import Constants from 'expo-constants';
import axios from 'axios';
import * as firebase from 'firebase';

class Splash extends Component {
  state = {
    isAuth: false,
    user: null,
    logoOpacity: new Animated.Value(0),
    sloganOpacity: new Animated.Value(0),
  };

  componentWillMount() {
    /*
     * *********************************
     * Check IF Authenticated ........ *
     * *********************************
     * */
    getDataFromAsyncStorage('user')
      .then(res => {
        if (res) {
          const user = JSON.parse(res);
          this.setState({
            isAuth: true,
            user,
          });
        }
      })
      .catch(err => {
        this.setState({
          isAuth: false,
          user: null,
        });
        console.log('error getting data from cache', err);
      });
  }

  componentDidMount() {
    this.opacityAnimation();
    this.checkAuth();
  }

  opacityAnimation = () => {
    Animated.timing(this.state.logoOpacity, {
      toValue: 1,
      duration: 1000,
    }).start();
    setTimeout(() => {
      Animated.timing(this.state.sloganOpacity, {
        toValue: 1,
        duration: 1000,
      }).start();
    }, 1000);
  };

  checkAuth = () => {
    setTimeout(async () => {
      if (this.state.isAuth) {
        this.props.getCurrentUser();
        await this.props.setNotificationReadCount();
        this.props.getShoppingCart();
        this.props.navigation.navigate('Home');
      } else {
        this.props.navigation.navigate('Auth');
      }
    }, 2000);
  };

  render() {
    const {width, height} = Dimensions.get('window');
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        />

        {/*<ImageBackground style={styles.background} source={images.splashBg}>*/}
        {/*<View style={styles.content}>*/}
        {/*<Image source={images.slogan}/>*/}
        {/*<Image source={images.logo}/>*/}
        {/*</View>*/}
        {/*</ImageBackground>*/}
        <ImageBackground style={styles.background} source={images.splash}>
          <View style={{paddingTop: 100}} />
          <View
            style={{
              width: width,
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
              alignItems: 'center',
            }}>
            <Animated.View style={{opacity: this.state.logoOpacity}}>
              <Image source={images.logoSplash} />
            </Animated.View>
            <Animated.View style={{opacity: this.state.sloganOpacity}}>
              <Image source={images.slogan} />
            </Animated.View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    flex: 1,
    marginTop: 40,
  },

  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
  },
});

const mapStateToProps = state => {
  const {cart, cartIsLoading} = state.cart;
  const {unreadNotificationsCount} = state.notifications;
  const {currentUser} = state.user;
  return {
    cart,
    cartIsLoading,
    unreadNotificationsCount,
    currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getShoppingCart: () => dispatch(getShoppingCart()),
    clearCart: () => dispatch(clearCart()),
    // getNotificationsList: () => dispatch(getNotificationsList()),
    setNotificationReadCount: () => dispatch(setNotificationReadCount()),
    getCurrentUser: () => dispatch(getCurrentUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
