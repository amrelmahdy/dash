import React, {Component} from 'react';
import {
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Button,
  Text,
  Image,
  View,
  StatusBar,
  Platform,
} from 'react-native';
import CartCell from '../../components/cart/CartCell';
import {Images} from '../../theme';
import {connect} from 'react-redux';
import {getShoppingCart, clearCart} from '../../store/actions/cartActions';
import HeaderRightBtn from '../../components/cart/HeaderRightBtn';

class Cart extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Cart',
    headerRight: <HeaderRightBtn />,
  });

  state = {
    isFetching: false,
  };

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => <HeaderRightBtn />,
    });
  }

  handleRefresh = () => {
    setTimeout(() => {
      //this.props.clearCart();
      this.props.getShoppingCart();
    }, 5000);
    //Alert.alert("Hey", "trying to refresh")
  };

  renderEmptyComponent = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={Images.cart.empty} />
      </View>
    );
  };

  render() {

    console.log("0000", this.props.cartIsLoading)

    let containerComponentStyle = {justifyContent: 'center', padding: 20};

    if (this.props.cart && this.props.cart.length === 0) {
      containerComponentStyle = {
        ...containerComponentStyle,
        flex: 1,
      };
    }

    console.log('minus .....', this.props.cart);

    return (
      <View style={{flex: 1}}>
        {!this.props.cartIsLoading ? (
          <FlatList
            data={this.props.cart}
            contentContainerStyle={containerComponentStyle}
            renderItem={({item, index}) => {
              return (
                <CartCell
                  handleRefresh={() =>
                    this.setState({isFetching: !this.state.isFetching})
                  }
                  index={index}
                  item={item}
                />
              );
            }}
            extraData={this.state.isFetching}
            keyExtractor={item => String(item.id)}
            refreshing={this.props.cartIsLoading}
            onRefresh={() => this.handleRefresh()}
            ListEmptyComponent={() => this.renderEmptyComponent()}
          />
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {cart, cartIsLoading} = state.storage.Cart;
  return {
    cart,
    cartIsLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getShoppingCart: () => dispatch(getShoppingCart()),
    clearCart: () => dispatch(clearCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
