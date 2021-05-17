import React, {Component} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import {menu} from '../../theme/images';
import {ListItem, Avatar} from 'react-native-elements';
import {
  getItemFromAsyncStorage,
  removeItemFromAsyncStorage,
} from './../../api/helpers';
import {NavigationServices} from '../../api/NavigationService';

import {clearProducts} from '../../store/actions/productActions';
import {clearCategories} from '../../store/actions/categoryActions';
import {logout} from '../../store/actions/userActions';

const {height, width} = Dimensions.get('window');

class Menu extends Component {
  static navigationOptions = {
    title: 'Menu',
  };

  menuData = [
    {
      id: 2,
      name: 'About us',
      image: menu.about,
      route: 'About',
    },
    {
      id: 3,
      name: 'Contact us',
      image: menu.contact,
      route: 'Contact',
    },
    {
      id: 4,
      name: 'Logout',
      image: menu.logout,
      route: 'Auth',
    },
  ];

  handlePageNavigation = async route => {
    if (route === 'Auth') {
      this.props.logout();
      await removeItemFromAsyncStorage('@auth-user');
      this.props.clearCategories();
      this.props.clearProducts();
      NavigationServices.reset(0, [{name: 'Auth'}]);
    } else {
      NavigationServices.navigate(route);
    }
  };

  componentDidMount() {}

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'rgba(229,229,229, 0.58)'}}>
        <StatusBar
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        />

        {!this.props.currentUserIsLoading && this.props.currentUser ? (
          <View
            style={{
              backgroundColor: '#FFF',
              margin: 15,
              marginBottom: 0,
              borderRadius: 10,
              padding: 10,
              height: '27%',
              flexDirection: 'column',
            }}>
            <View style={{alignItems: 'flex-end', flex: 0.2}}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('EditProfile')}>
                <Text
                  style={{
                    color: '#ea0a2a',
                    fontWeight: 'bold',
                  }}>
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 0.8,
              }}>
              <Avatar
                rounded
                size="large"
                icon={{name: 'user', type: 'font-awesome'}}

                source={{
                  uri:
                    'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                }}
              />
              <Text
                style={{
                  marginTop: '3%',
                  color: '#ea0a2a',
                  fontWeight: 'bold',
                 
                }}>
                {this.props.currentUser.name}
              </Text>
              <Text
                style={{
                  marginTop: '3%',
                  color: '#b9b9b9',
                
                  marginBottom: Platform.OS === 'ios' ? 0 : 20,
                }}>
                {this.props.currentUser.email}
              </Text>
            </View>
          </View>
        ) : null}

        <View
          style={{
            margin: 15,
            borderRadius: 10,
            height: this.props.currentUser ? '68%' : '95%',
            backgroundColor: '#FFF',
            padding: 10,
          }}>
          {this.menuData.map((item, i) => {
            return (
              <ListItem
                key={i}
                onPress={() => this.handlePageNavigation(item.route)}
                bottomDivider>
                <Image source={item.image} />
                <ListItem.Content>
                  <ListItem.Title>{item.name}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => {
  const {currentUser, currentUserIsLoading} = state.auth.User;
  return {
    currentUser,
    currentUserIsLoading,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    clearProducts: () => dispatch(clearProducts()),
    clearCategories: () => dispatch(clearCategories()),
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
