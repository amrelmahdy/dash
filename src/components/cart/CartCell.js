import React, {Component} from 'react';
import {
  View,
  Alert,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image as NativeImage,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Images, Colors} from '../../theme';
import {Image} from 'react-native-elements';
import {addToCart, removeFromCart} from '../../store/actions/cartActions';
import {connect} from 'react-redux';
import {goToProductDetails} from '../../helpers/magicServices';

class CartCell extends Component {
  handleRemoveItemFromCart = product => {
    this.props.removeFromCart(product);
  };

  render() {
    console.log('product', this.props.item);
    const {
      image,
      name,
      product_code,
      qty,
      product_name,
      product_image,
      product_id,
    } = this.props.item;
    return (
      <View style={styles.container}>
        <View style={styles.cell}>
          <TouchableOpacity
            onPress={() => {
              goToProductDetails(product_id);
            }}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{height: 'auto', flex: 0.28}}>
                <Image
                  source={{uri: product_image}}
                  style={{width: '100%', height: '100%'}}
                />
              </View>
              <View
                style={{
                  marginLeft: 10,
                  marginTop: 10,
                  flexDirection: 'row',
                  flex: 0.7,
                }}>
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#ea0a2a',
                      fontWeight: 'bold',
                      margin: 3,
                    }}
                    numberOfLines={1}>
                    {product_name}{' '}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#7f7f7f',
                      margin: 3,
                    }}>
                    {product_code}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#7f7f7f',
                      margin: 3,
                      textTransform: 'capitalize',
                    }}>
                    {name}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <View
            style={{
              borderBottomColor: '#e3e3e3',
              borderBottomWidth: 1,
              marginTop: 15,
            }}></View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 15,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => this.handleRemoveItemFromCart(this.props.item)}>
              <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <Icon color={Colors.mainColor} size={20} name="trash" />

                <Text
                  style={{
                    marginLeft: 10,
                    color: '#ea0a2a',
                  }}>
                  Remove
                </Text>
              </View>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                //backgroundColor: '#e9e9ef',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: Colors.mainColor,
              }}>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  padding: 10,
                  borderRightWidth: 1,
                  borderRightColor: Colors.mainColor,
                }}
                onPress={() => {
                  this.props.handleRefresh();
                  this.props.addToCart(this.props.item, (isMinus = true));
                }}>
                <Icon color={Colors.mainColor} size={15} name="minus" />

                {/* <NativeImage source={Images.cart.minus} /> */}
              </TouchableOpacity>
              <View
                style={{
                  paddingVertical: 3,
                  width: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: Colors.mainColor}}>{qty}</Text>
              </View>

              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  borderLeftWidth: 1,
                  borderLeftColor: Colors.mainColor,
                  padding: 10,
                }}
                onPress={() => {
                  this.props.handleRefresh();
                  this.props.addToCart(this.props.item);
                }}>
                <Icon color={Colors.mainColor} size={15} name="plus" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    shadowColor: '#333',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 0,
  },
  cell: {
    flexDirection: 'column',
    flex: 1,
    padding: 15,
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});

const mapStateToProps = state => {
  const {cart, cartIsLoading} = state.storage.Cart;
  return {
    cart,
    cartIsLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeFromCart: product => dispatch(removeFromCart(product)),
    addToCart: (product, isMinus) => dispatch(addToCart(product, isMinus)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartCell);
