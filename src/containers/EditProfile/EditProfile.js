import React, {Component} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity,
  StatusBar,
  Platform,
  ActivityIndicator
} from 'react-native';
import {
  editProfileURL,
} from '../../config';
import {storeItemToAsyncStorage} from './../../api/helpers';
import axios from 'axios';
import {NavigationServices} from '../../api/NavigationService';
import {clearCart, getShoppingCart} from '../../store/actions/cartActions';
import { setCurrentUser } from '../../store/actions/userActions';

import {connect} from 'react-redux';
import {Colors} from '../../theme';

class EditProfile extends Component {
  state = {
    user: null,
    isLoading: false,
  };

  componentDidMount() {
    if (!this.state.user && this.props.currentUser) {
      this.setState({
        user: this.props.currentUser,
      });
    }
  }

  handleFormSubmission = async () => {
    this.setState({
      isLoading: true,
    });
    axios
      .post(editProfileURL, this.state.user)
      .then(response => {
        console.log('ggg', response);
        this.setState({
          isLoading: false,
        });
        switch (response.data.Error.code) {
          case 20:
            // cache user
            storeItemToAsyncStorage(
              '@auth-user',
              JSON.stringify(response.data.Response),
            )
              .then(res => {
                //console.log("Async success user", res);
                Alert.alert('success', 'password changed successfully');
                this.props.setCurrentUser(response.data.Response);
                NavigationServices.navigate('Menu');
              })
              .catch(err => {
                console.log('Async error user', err);
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
      });
  };

  handleOninputChange = (type, text) => {
    switch (type) {
      case 'name':
        console.log(text);
        this.setState({
          ...this.state,
          user: {
            ...this.state.user,
            name: text,
          },
        });

        break;
      case 'email':
        console.log(text);
        this.setState({
          ...this.state,
          user: {
            ...this.state.user,
            email: text,
          },
        });

        break;
      case 'mobile':
        console.log(text);
        this.setState({
          ...this.state,
          user: {
            ...this.state.user,
            mobile: text,
          },
        });

        break;
      default:
      //
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        />
        <ScrollView
          contentContainerStyle={{
            minHeight: 100,
          }}
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}>
          <View style={styles.view}>
            <TextInput
              style={styles.textInput}
              placeholderTextColor="#AAA"
              placeholder="Name"
              onChangeText={text => this.handleOninputChange('name', text)}
              value={this.state.user ? this.state.user.name : null}
            />
            <TextInput
              style={styles.textInput}
              placeholderTextColor="#AAA"
              placeholder="Email"
              onChangeText={text => this.handleOninputChange('email', text)}
              value={this.state.user ? this.state.user.email : null}
            />
            <TextInput
              style={styles.textInput}
              onChangeText={text => this.handleOninputChange('mobile', text)}
              placeholder="Mobile"
              value={this.state.user ? this.state.user.mobile : null}
            />
            <View style={{position: 'relative'}}>
              <TextInput
                style={styles.textInput}
                placeholder="Password"
                placeholderTextColor="#AAA"
                secureTextEntry={true}
                editable={false}
              />
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ChangePassword')}
                style={{
                  position: 'absolute',
                  top: '20%',
                  left: '75%',
                }}>
                <Text
                  style={{
                    color: '#ea0a2a',
                    fontSize: 12,
                  }}>
                  Change
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => {
                this.handleFormSubmission();
              }}
              style={{
                backgroundColor: Colors.mainColor,
                width: '100%',
                height: 50,
                justifyContent: 'center',
                //paddingTop: 5,
                //paddingBottom: 5,
                paddingLeft: 20,
                paddingRight: 20,
                borderRadius: 5,
                marginTop: 20,
                // borderWidth: 1,
                // borderColor: Colors.red,
              }}>
              {this.state.isLoading && (
                <View style={{position: 'absolute', right: 120, top: 15}}>
                  <ActivityIndicator color="#FFF" />
                </View>
              )}
              <Text style={{color: Colors.white, textAlign: 'center'}}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#c7c7c7',
    flex: 1,
  },
  scrollView: {
    width: '90%',
    marginLeft: '5%',
    marginTop: '5%',
    marginBottom: '5%',
    borderRadius: 15,
    backgroundColor: '#ffffff',
  },
  view: {
    padding: 25,
    paddingTop: 50,
  },
  textInput: {
    height: 40,
    width: '100%',
    padding: 10,
    backgroundColor: '#e9e9ef',
    //marginLeft: '5%',
    marginBottom: '5%',
    color: '#606063',
    borderRadius: 5,
  },
});

const mapStateToProps = state => {
  const {cart, cartIsisLoading} = state.storage.Cart;
  const {currentUser} = state.auth.User;
  return {
    cart,
    cartIsisLoading,
    currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getShoppingCart: () => dispatch(getShoppingCart()),
    clearCart: () => dispatch(clearCart()),
    setCurrentUser: upUser => dispatch(setCurrentUser(upUser)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
