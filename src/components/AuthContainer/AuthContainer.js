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
  Platform,
  ActivityIndicator,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import {Images} from '../../theme/images';
import {NavigationServices} from '../../api/NavigationService';
import styles from './AuthContainer.Styles';
import {colors} from '../../styles/colors';
import {clearCart, getShoppingCart} from '../../store/actions/cartActions';
import {setCurrentUser} from '../../store/actions/userActions';

const {width, height} = Dimensions.get('window');

class AuthContainer extends Component {
  state = {
    login: null,
    password: null,
    isLoading: false,
  };

  componentDidMount() {}

  render() {
    const {width, height} = Dimensions.get('window');

    return (
      <ImageBackground style={styles.background} source={Images.splashBg}>
        <View style={[styles.logoContainer]}>
          <Image
            style={{width: 250}}
            resizeMode="contain"
            source={Images.logoSplash}
          />
        </View>
        <ScrollView>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            {/* Flex 3  */}
            <View style={styles.form}>
              <View
                style={{
                  flex: 1,
                  //justifyContent: 'center',
                  alignItems: 'center',
                }}
                showsVerticalScrollIndicator={false}>
                <Text style={styles.form_title}>{this.props.title}</Text>
                {this.props.children}
                <TouchableOpacity
                  style={styles.button}
                  disabled={this.props.isLoading}
                  onPress={this.props.onPressMainButton}>
                  <View style={{ position: 'relative' }}>
                    <Text
                      adjustsFontSizeToFit={true}
                      numberOfLines={1}
                      style={styles.button_text}>
                      {this.props.mainButtonText}
                    </Text>
                    {this.props.isLoading && (
                      <View style={{position: 'absolute', left: 50, top: 2}}>
                        <ActivityIndicator color="#333" />
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
                {this.props.primaryTextLink && this.props.onPressPrimaryLink && (
                  <Text
                    onPress={this.props.onPressPrimaryLink}
                    //onPressPrimaryLink
                    //NavigationServices.navigate('ForgetPassword')
                    //}
                    style={[
                      colors.white,
                      {marginTop: 15, textAlign: 'center'},
                    ]}>
                    {this.props.primaryTextLink}
                  </Text>
                )}
                {this.props.secondaryTextLink &&
                  this.props.onPressSecondaryLink && (
                    <Text
                      onPress={this.props.onPressSecondaryLink}
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
                      {this.props.secondaryTextLink}
                      {/* <Text
                      adjustsFontSizeToFit={true}
                      numberOfLines={1}
                      style={{textTransform: 'capitalize'}}>
                      &nbsp;Sign Up
                    </Text> */}
                    </Text>
                  )}
                {this.props.tertiaryTextLink && this.props.onPressTertiaryLink && (
                  <Text
                    onPress={this.props.onPressTertiaryLink}
                    style={[
                      colors.white,
                      {fontWeight: 'bold', textAlign: 'center'},
                    ]}>
                    {this.props.tertiaryTextLink}
                  </Text>
                )}
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </ImageBackground>
    );
  }
}

AuthContainer.defaultProps = {
  mainButtonText: 'Login',
};

export default AuthContainer;
