import React, {Component} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import {
  getNotificationsList,
  getMoreNotifications,
  setNotificationReadCount,
} from '../../store/actions/notificationActions';
import {connect} from 'react-redux';
import {appColors} from '../../styles/colors';
import {NavigationServices} from '../../api/NavigationService';
import NotificationsCell from '../../components/notifications/NotificationsCell';
import {Divider} from 'react-native-elements';
import {notifications} from '../../constants/images';

class Notifications extends Component {
  state = {
    limit: 10,
    offset: 0,
    isLoadingMore: false,
    isMounting: 0,
  };

  componentWillMount() {
    if (this.state.isMounting === 0) {
      this.setState({
        isMounting: 1,
      });
    } else {
      this.setState({
        isMounting: 0,
      });
    }
  }

  static navigationOptions = {
    title: 'Notification',
  };

  componentDidMount = () => {
    this.props.getNotificationsList(10, 0);
  };
  handleRefresh = () => {
    this.setState({
      limit: 10,
      offset: 0,
    });
    setTimeout(() => {
      this.props.getNotificationsList(10, 0);
      this.props.setNotificationReadCount();
    }, 5000);
  };

  handleLoadMore = () => {
    this.setState({isLoadingMore: true});
    setTimeout(async () => {
      await this.props.getMoreNotifications(
        this.state.limit,
        this.state.offset + 10,
      );
      this.setState({
        isLoadingMore: false,
        offset: this.state.offset + 10,
      });
    }, 1500);
  };

  renderFooter = () => {
    return this.state.isLoadingMore ? <ActivityIndicator /> : null;
  };
  renderEmptyComponent = () => {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={notifications.empty} />
      </View>
    );
  };

  render() {
    let containerComponentStyle = {justifyContent: 'center', padding: 20};

    if (this.props.notifications && this.props.notifications.length === 0) {
      containerComponentStyle = {
        ...containerComponentStyle,
        flex: 1,
      };
    }
    return (
      <View style={{flex: 1}}>
        <StatusBar
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        />

        {this.props.currentUser ? (
          !this.props.notificationsIsLoading ? (
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={this.props.notifications}
              extraData={this.state}
              contentContainerStyle={containerComponentStyle}
              /*  initialNumToRender={5}*/
              renderItem={({item}) => <NotificationsCell notification={item} />}
              refreshing={this.props.notificationsIsLoading}
              onRefresh={() => this.handleRefresh()}
              onEndReached={({distanceFromEnd}) => {
                if (distanceFromEnd > 0) {
                  console.log('dis', distanceFromEnd);
                  this.handleLoadMore();
                }
              }}
              ItemSeparatorComponent={() => (
                <Divider style={{backgroundColor: '#AAA'}} />
              )}
              onEndReachedThreshold={0.09}
              ListEmptyComponent={() => this.renderEmptyComponent()}
              ListFooterComponent={() => this.renderFooter()}
              disableVirtualization
            />
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator />
            </View>
          )
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <StatusBar
              barStyle={
                Platform.OS === 'ios' ? 'dark-content' : 'light-content'
              }
            />
            <Text style={{fontSize: 15, textTransform: 'capitalize'}}>
              You need to login to have notifications
            </Text>
            <TouchableOpacity
              onPress={() => {
                NavigationServices.navigate('Login');
              }}
              style={{
                backgroundColor: 'transparent'.red,
                paddingTop: 5,
                paddingBottom: 5,
                paddingLeft: 20,
                paddingRight: 20,
                borderRadius: 5,
                marginLeft: '30%',
                marginRight: '30%',
                marginTop: 20,
                borderWidth: 1,
                borderColor: appColors.red,
              }}>
              <Text style={{color: appColors.red, textAlign: 'center'}}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cart: {
    padding: 15,
  },
});

const mapStateToProps = state => {
  const {notifications, notificationsIsLoading} = state.notifications;
  const {currentUser, currentUserIsLoading} = state.user;
  return {
    notifications,
    notificationsIsLoading,
    currentUser,
    currentUserIsLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getNotificationsList: (limit, offset) =>
      dispatch(getNotificationsList(limit, offset)),
    getMoreNotifications: (limit, offset) =>
      dispatch(getMoreNotifications(limit, offset)),
    setNotificationReadCount: () => dispatch(setNotificationReadCount()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
