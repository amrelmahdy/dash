import React, {Component} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Modal,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Image as NativeImage,
} from 'react-native';

import {Images, Colors} from '../../theme';
import {Image} from 'react-native-elements';
import {
  getHeader,
  productDetailsURL,
  setNotificationReadURL,
} from '../../config';
import {addToCart} from '../../store/actions/cartActions';
import {connect} from 'react-redux';
import axios from 'axios';
// import Constants from 'expo-constants';
// import {Header} from "react-navigation";
import {
  setNotificationRead,
  setNotificationReadCount,
} from '../../store/actions/notificationActions';
import ImageViewer from 'react-native-image-zoom-viewer';
import ImageView from 'react-native-image-viewing';

const {height} = Dimensions.get('window');
const windowHeight = height;

const dimensions = Dimensions.get('window');
const imageHeight = Math.round((dimensions.width * 9) / 16);
const imageWidth = dimensions.width;

class ProductsDetails extends Component {
  state = {
    isAuth: false,
    isLoading: true,
    product: null,
    currentPickedColor: null,
    dimensions: null,
    btnDimensions: null,
    refreshing: false,
    isImagePreviewVisible: false,
  };
  static navigationOptions = ({navigation}) => ({
    title: 'Product Details',
  });

  setImagePreviewVisible(status) {
    this.setState({isImagePreviewVisible: status});
  }

  handleRefresh = () => {
    this.setState({refreshing: true});
    this.getProductDetails();
  };

  handleAddToCart = product => {
    if (product && product.colors && product.colors.length) {
      if (this.state.currentPickedColor) {
        this.props.addToCart({
          ...this.state.currentPickedColor,
          product_name: product.name,
          product_image: product.image,
          product_code: product.code,
          product_id: product.id,
        });
      } else {
        Alert.alert('Sorry', 'You must choose color first', [{text: 'Ok'}]);
      }
    } else {
      Alert.alert('Sorry', 'Not in stock', [{text: 'Ok'}]);
    }
    //NavigationServices.reset([NavigationServices.navigate("Cart"), 0])
  };

  onLayout = event => {
    if (this.state.dimensions) return; // layout was already called
    let {width, height} = event.nativeEvent.layout;
    this.setState({dimensions: {width, height}});
  };

  getProductDetails = () => {
    axios
      .post(productDetailsURL, {product_id: this.props.route.params.product_id})
      .then(response => {
        console.log(response);
        if (response.data.Error.status === true) {
          console.log('response-det', response);
          this.setState(
            {
              isLoading: false,
              product: response.data.Response,
              refreshing: false,
            },
            () => {
              console.log(this.state.product, 'tttt');
            },
          );
        }
      })
      .catch(err => {
        Alert.alert('Whoops', 'Something went wrong');
      });
  };

  componentDidMount() {
    this.getProductDetails();
    // handle notification details .....
    if (this.props.route.params.notificationId) {
      getHeader()
        .then(header => {
          axios
            .post(
              setNotificationReadURL,
              {
                notification_id: this.props.navigation.getParam(
                  'notificationId',
                ),
              },
              {headers: header},
            )
            .then(response => {
              if (response.data.Error.status === true) {
                this.props.setNotificationRead(
                  this.props.navigation.getParam('notificationId'),
                );
                this.props.setNotificationReadCount();
              }
            })
            .catch(err => {
              // Alert.alert("Whoops", "Something went wrong")
            });
        })
        .catch(err => {
          console.log('Unable to get header', err);
          // Alert.alert("Whoops", "Something went wrong")
        });
    }
  }

  chooseProductColor = item => {
    if (!this.state.currentPickedColor) {
      this.setState({
        currentPickedColor: item,
      });
    } else {
      if (this.state.currentPickedColor.id === item.id) {
        this.setState({
          currentPickedColor: null,
        });
      } else {
        this.setState({
          currentPickedColor: item,
        });
      }
    }
  };

  render() {
    // console.log("ppppp",this.state.dimensions ?((this.state.dimensions.height < windowHeight / 2) ? this.state.dimensions.height : windowHeight / 2) : windowHeight / 2);
    if (this.state.dimensions) {
      let {dimensions} = this.state;
      let {width, height} = dimensions;
    }

    if (!this.state.isLoading) {
      return (
        <View style={{flex: 1, flexDirection: 'column'}}>
          <StatusBar
            barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
          />
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
              />
            }
            contentContainerStyle={{
              flexGrow: 1,
            }}
            showsVerticalScrollIndicator={false}>
            <View style={{}}>
              <TouchableHighlight
                onPress={() => {
                  this.setImagePreviewVisible(true);
                }}>
                <Image
                  source={{uri: this.state.product.image}}
                  style={{height: imageHeight, width: imageWidth}}
                />
              </TouchableHighlight>
            </View>
            <View
              style={{
                width: '90%',
                marginLeft: '5%',
                marginBottom: this.state.dimensions
                  ? this.state.dimensions.height
                  : 0,
              }}>
              <View
                style={{
                  flex: 1,
                  padding: 10,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: '#ea0a2a',
                    fontWeight: 'bold',
                    marginBottom: 10,
                   
                  }}>
                  {this.state.product.name}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      flex: 0.8,
                      fontSize: 16,
                      color: '#9d9d9d',
                     
                    }}>
                    {this.state.product.code}
                  </Text>
                  {this.props.currentUser &&
                  this.props.currentUser.role_id === 2 ? (
                    <View
                      style={{
                        flex: 0.2,
                        backgroundColor: '#f1f1f1',
                        padding: 4,
                        borderRadius: 4,
                      }}>
                      <Text
                        style={{
                          color: '#F00',
                          textAlign: 'center',
                          fontSize: 12,
                          
                        }}>
                        {this.state.product.price} EGP
                      </Text>
                    </View>
                  ) : null}
                </View>
                <View
                  style={{
                    borderBottomColor: '#d2d2d2',
                    borderBottomWidth: 1,
                    marginTop: 10,
                  }}></View>

                <View style={{marginTop: 10, marginBottom: 20}}>
                  <Text
                    style={{
                      color: '#9d9d9d',
                      fontSize: 15,
                      
                    }}>
                    {this.state.product.desc}
                  </Text>
                </View>
                {this.state.product.colors &&
                this.state.product.colors.length ? (
                  <View>
                    <Text
                      style={{
                        color: '#505050',
                        fontWeight: 'bold',
                        marginBottom: 10,
                      }}>
                      Colors
                    </Text>
                    <FlatList
                      data={this.state.product.colors}
                      extraData={this.state}
                      renderItem={({item}) => (
                        <TouchableOpacity
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 5,
                          }}
                          onPress={() => this.chooseProductColor(item)}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <NativeImage
                              style={{marginRight: '4%'}}
                              source={
                                this.state.currentPickedColor !== null &&
                                this.state.currentPickedColor.id === item.id
                                  ? Images.cart.checked
                                  : Images.cart.unchecked
                              }
                            />
                            <Text
                              style={{
                                color: '#9d9d9d',
                                fontSize: 15,
                                textTransform: 'capitalize',
                              }}>
                              {item.name}{' '}
                            </Text>
                          </View>
                          {this.props.currentUser &&
                          this.props.currentUser.role_id === 2 ? (
                            <Text
                              style={{
                                color: '#9d9d9d',
                                marginLeft: '1%',
                              }}>
                              {item.quantity}
                            </Text>
                          ) : null}
                        </TouchableOpacity>
                      )}
                      keyExtractor={item => String(item.id)}
                    />
                  </View>
                ) : null}
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity
            onLayout={this.onLayout}
            onPress={() => this.handleAddToCart(this.state.product)}
            style={{
              backgroundColor: Colors.mainColor,
              paddingLeft: 5,
              paddingRight: 5,
              alignItems: 'center',
              borderRadius: 6,
              width: '90%',
              position: 'absolute',
              bottom: 5,
              marginLeft: '5%',
            }}>
            <Text
              style={{
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: 15,
                padding: 15,
               
              }}>
              Add to Cart
            </Text>
          </TouchableOpacity>

          <ImageView
            images={[{uri: this.state.product.image}]}
            imageIndex={0}
            visible={this.state.isImagePreviewVisible}
            onRequestClose={() => {
              this.setImagePreviewVisible(false);
            }}
          />
        </View>
      );
    } else {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <StatusBar
            barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
          />
          <ActivityIndicator color={Colors.mainColor} />
        </View>
      );
    }
  }
}

const mapStateToProps = state => {
  const {cart, addingToCart} = state.storage.Cart;
  const {currentUser} = state.auth.User;
  return {
    cart,
    addingToCart,
    currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: product => dispatch(addToCart(product)),
    setNotificationRead: notification_id =>
      dispatch(setNotificationRead(notification_id)),
    setNotificationReadCount: () => dispatch(setNotificationReadCount()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsDetails);
