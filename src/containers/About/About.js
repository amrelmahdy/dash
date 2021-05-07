import React, {Component} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  StatusBar,
  Platform,
} from 'react-native';
import {Images} from '../../theme';
import axios from 'axios';
import {aboutUsURL} from '../../config';
import ConnectionError from '../../components/ConnectionError';
import {Colors} from './../../theme';


class About extends Component {
  static navigationOptions = {
    headerTitle: 'About',
  };

  state = {
    loading: true,
    about: '',
    no_connection: false,
  };

  componentDidMount() {
    axios
      .get(aboutUsURL)
      .then(res => {
        if (res.data.Error.status === true) {
          this.setState({
            no_connection: false,
            loading: false,
            about:
              res.data.Response && res.data.Response.about_us
                ? res.data.Response.about_us
                : '',
          });
        }
      })
      .catch(err => {
        console.log("dkdkjd", err)

        this.setState({
          no_connection: true,
          loading: true,
        });
      });
  }

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
          {!this.state.loading ? (
            <ScrollView
              contentContainerStyle={{
                minHeight: 100,
              }}
              showsVerticalScrollIndicator={false}
              style={styles.scrollView}>
              <View style={styles.view}>
                <Image  source={Images.logoAbout} resizeMode='contain' style={{marginBottom: 25}} />
                <Text style={{color: '#aaaaaa', textAlign: 'center'}}>
                  {this.state.about}
                </Text>
              </View>
            </ScrollView>
          ) : (
            <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }, styles.scrollView]}>
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
  },
  scrollView: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',

    marginTop: '5%',
    marginBottom: '5%',
    borderRadius: 15,
    backgroundColor: '#ffffff',
  },
  view: {
    padding: 35,
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    width: '90%',
    padding: 10,
    backgroundColor: '#e9e9ef',
    marginLeft: '5%',
    marginBottom: '5%',
    color: '#606063',
    borderRadius: 10,
  },
});

export default About;
