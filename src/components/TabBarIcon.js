import {Alert, Image, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {clearCart, getShoppingCart} from '../store/actions/cartActions';
import {connect} from 'react-redux';
import {
  setNotificationReadCount,
  getNotificationsList,
} from '../store/actions/notificationActions';

class TabBarIcon extends React.Component {
  render() {
    return (
      <View style={{position: 'relative'}}>
        {this.props.routeName === 'Cart' &&
        this.props.cart &&
        this.props.cart.length !== 0 ? (
          <View
            style={{
              position: 'absolute',
              right: -13,
              top: -4,
              backgroundColor: 'red',
              borderRadius: 9,
              width: 18,
              height: 18,
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 111,
            }}>
            <Text style={{color: '#FFF', textAlign: 'center'}}>
              {this.props.cart.length}
            </Text>
          </View>
        ) : null}
        {this.props.routeName === 'Notifications' &&
        this.props.unreadNotificationsCount !== 0 ? (
          <View
            style={{
              position: 'absolute',
              right: -13,
              top: -4,
              backgroundColor: 'red',
              borderRadius: 9,
              width: 18,
              height: 18,
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 111,
            }}>
            <Text
              style={{
                color: '#FFF',
                textAlign: 'center',
              }}>
              {this.props.unreadNotificationsCount}
            </Text>
          </View>
        ) : null}
        <Image
          source={this.props.icon}
          size={25}
          color={this.props.tintColor}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {cart, cartIsLoading} = state.storage.Cart;
  const {unreadNotificationsCount, notifications} = state.storage.Notification;
  return {
    cart,
    cartIsLoading,
    unreadNotificationsCount,
    notifications,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getShoppingCart: () => dispatch(getShoppingCart()),
    clearCart: () => dispatch(clearCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TabBarIcon);


