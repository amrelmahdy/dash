import React, {Component} from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Images, Colors} from '../../theme';
import {Divider} from 'react-native-elements';
import MapView from 'react-native-maps';
import {AxiosInstance} from './../../api/AxiosInstance';
import {contactURL} from './../../config';
import ConnectionError from '../../components/ConnectionError';

class Contact extends Component {
  static navigationOptions = {
    title: 'Contact',
  };

  state = {
    isLoading: false,
    contact: null,
    no_connection: false,
  };

  componentDidMount() {
    this.setState({
      isLoading: true,
    });
    AxiosInstance.get(contactURL)
      .then(res => {
        if (res.data.Error.status === true) {
          console.log('re=>s', res.data.Error.status);

          this.setState({
            isLoading: false,
            no_connection: false,
            contact: res.data?.Response ? res.data.Response : null,
          });
        }
      })
      .catch(err => {
        console.log('err', err);

        this.setState({
          no_connection: true,
          isLoading: false,
        });
      });
  }

  dialCall = phone => {
    let phoneNumber = `tel:${phone}`;
    Linking.openURL(phoneNumber);
  };

  render() {
    if (this.state.no_connection) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ConnectionError onPress={() => this.componentDidMount()} />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          {!this.state.isLoading ? (
            <ScrollView
              style={{
                backgroundColor: '#FFF',
                width: '90%',
                marginTop: 20,
                marginBottom: 20,
                borderRadius: 15,
                padding: 30,
              }}>
              <View style={{flex: 1}}>
                <View style={{alignItems: 'center'}}>
                  <Image
                    source={Images.contact.contactUs}
                    style={{marginBottom: 20}}
                  />
                  <Text style={styles.title}>get in touch !</Text>
                </View>
              </View>

              <View style={{flex: 1}}>
                <View style={styles.iconLabel}>
                  <Image
                    source={Images.menu.contact}
                    style={styles.iconLabelTest}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(`mailto:${this.state.contact?.email}`);
                    }}>
                    <Text>{this.state.contact?.email}</Text>
                  </TouchableOpacity>
                  
                </View>

                <View style={styles.iconLabel}>
                  <Image
                    source={Images.menu.contact}
                    style={styles.iconLabelTest}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL(this.state.contact?.website);
                    }}>
                    <Text>{this.state.contact?.website}</Text>
                  </TouchableOpacity>
                </View>

                <Divider />
              </View>

              <View style={{flex: 1, paddingTop: 10, paddingBottom: 10}}>
                <View style={styles.iconLabel}>
                  <Image
                    source={Images.contact.phone}
                    style={{marginRight: 5, marginTop: 5}}
                  />
                  <TouchableOpacity
                    onPress={() => this.dialCall(this.state.contact?.mobile)}>
                    <Text style={styles.iconLabelTest}>
                      {this.state.contact?.mobile}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.iconLabel}>
                  <Image
                    source={Images.contact.phone}
                    style={{marginRight: 5, marginTop: 5}}
                  />
                  <TouchableOpacity
                    onPress={() => this.dialCall(this.state.contact?.phone)}>
                    <Text style={styles.iconLabelTest}>
                      {this.state.contact?.phone}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{flex: 1}}>
                <View style={styles.iconLabel}>
                  <Image
                    source={Images.contact.address}
                    style={{marginRight: 5, marginTop: 5}}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(this.state.contact?.map_address)
                    }>
                    <Text style={styles.iconLabelTest}>
                      {this.state.contact?.address}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{height: 200, marginTop: 10}}>
                  {/*</MapView>*/}
                  {this.state.contact &&
                    this.state.contact.longitude &&
                    this.state.contact.latitude && (
                      <MapView
                        style={{height: 200, width: '100%'}}
                        region={{
                          latitude: JSON.parse(this.state.contact.latitude),
                          longitude: JSON.parse(this.state.contact.longitude),
                          latitudeDelta: 0.0922,
                          longitudeDelta: 0.0421,
                        }}>
                        <MapView.Marker.Animated
                          title={this.state.contact?.address}
                          description="Click the marker to navigate!"
                          coordinate={{
                            latitude: JSON.parse(this.state.contact?.latitude),
                            longitude: JSON.parse(
                              this.state.contact?.longitude,
                            ),
                          }}
                          onPress={() => {
                            Linking.openURL(this.state.contact?.map_address);
                          }}
                        />
                      </MapView>
                    )}

                  {/* <MapView
                                style={{flex: 1}}
                                region={region}
                            >
                                <Marker
                                    coordinate={marker.coordinate}
                                    title={marker.title}
                                    description={marker.description}
                                />
                            </MapView> */}
                </View>
                {/*<View style={styles.mapContainer}>
                       <MapView
                           style={styles.map}
                           region={{
                               latitude: 37.78825,
                               longitude: -122.4324,
                               latitudeDelta: 0.015,
                               longitudeDelta: 0.0121,
                           }}
                       >
                       </MapView>
                   </View>*/}
              </View>
            </ScrollView>
          ) : (
            <View style={[styles.container, styles.scrollView]}>
              <ActivityIndicator color={Colors.mainColor} />
            </View>
          )}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#c7c7c7',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: 150,
  },

  title: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  scrollView: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '5%',
    marginBottom: '5%',
    borderRadius: 15,
    backgroundColor: '#ffffff',
    padding: 30,
    flex: 1,
  },

  iconLabel: {
    flexDirection: 'row',
    marginBottom: 10,
  },

  iconLabelTest: {
    marginRight: 10,
    marginTop: 3,
  },
});

export default Contact;
