import {Alert, Image, Text, View, Button, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  clearCart,
  emptyCart,
  getShoppingCart,
  startLoading,
} from './../../store/actions/cartActions';
import {connect} from 'react-redux';
import {Colors} from '../../theme';
import {
  editProfileURL,
  getDataFromAsyncStorage,
  getHeader,
  loginURL,
  placeAnOrderURL,
  storeDataToAsyncStorage,
} from '../../config';
import {NavigationServices} from '../../api/NavigationService';
import axios from 'axios';

class HeaderRightBtn extends React.Component {
  handleSubmitOrder = () => {
    if (!this.props.currentUser) {
      Alert.alert('Login', 'You must login to make order', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'login', onPress: () => NavigationServices.navigate('Auth')},
      ]);
    } else {
      axios
        .post(placeAnOrderURL, {orders: this.props.cart})
        .then(response => {
          console.log("order", response)

          switch (response.data.Error.code) {
            case 20:
              // cache user
              this.props.emptyCart();
              Alert.alert('Success', 'Order Placed Successfully');
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
    }
  };

  render() {
    return (
      <View style={{marginRight: 20}}>
        {this.props.cart.length ? (
          <TouchableOpacity onPress={() => this.handleSubmitOrder()}>
            <Text
              style={{
                color: Colors.mainColor,
                fontWeight: 'bold',
                fontSize: 17,
              }}>
              Submit
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {cart, cartIsLoading} = state.storage.Cart;
  const {currentUser} = state.auth.User;
  return {
    cart,
    cartIsLoading,
    currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getShoppingCart: () => dispatch(getShoppingCart()),
    clearCart: () => dispatch(clearCart()),
    emptyCart: () => dispatch(emptyCart()),
    startLoading: () => dispatch(startLoading()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderRightBtn);
