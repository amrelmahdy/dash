import React, {Component} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  StatusBar,
  Platform,
  ActivityIndicator
} from 'react-native';
import {changePasswordURL} from '../../config';
import axios from 'axios';
import {NavigationServices} from '../../api/NavigationService';
import {Colors} from '../../theme';

class ChangePassword extends Component {
  state = {
    old_password: '',
    new_password: '',
    confirm_new_password: '',
    isLoading: false,
  };

  changePasswordSubmission = () => {
    if (this.state.new_password.length < 6) {
      Alert.alert(
        'Validation',
        'The new password must be at least 6 characters',
      );
    } else if (this.state.new_password !== this.state.confirm_new_password) {
      Alert.alert('Validation', "Confirm password doesn't match");
    } else {
      this.setState({
        isLoading: true,
      });
      axios
        .post(changePasswordURL, this.state)
        .then(response => {
          this.setState({
            isLoading: false,
          });
          console.log(response);
          switch (response.data.Error.code) {
            case 20:
              Alert.alert('success', 'password changed successfully');
              NavigationServices.navigate('Menu');
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
            case 23: // validation
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

  handleOninputChange = (type, text) => {
    switch (type) {
      case 'old_password':
        this.setState({
          old_password: text,
        });
        break;
      case 'new_password':
        this.setState({
          new_password: text,
        });
        break;
      case 'confirm_new_password':
        this.setState({
          confirm_new_password: text,
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
              placeholder="Old Password"
              placeholderTextColor="#AAA"
              secureTextEntry={true}
              onChangeText={text =>
                this.handleOninputChange('old_password', text)
              }
            />
            <TextInput
              style={styles.textInput}
              placeholderTextColor="#AAA"
              placeholder="New Password"
              secureTextEntry={true}
              onChangeText={text =>
                this.handleOninputChange('new_password', text)
              }
            />
            <TextInput
              style={styles.textInput}
              placeholderTextColor="#AAA"
              placeholder="Confirm New Password"
              secureTextEntry={true}
              onChangeText={text =>
                this.handleOninputChange('confirm_new_password', text)
              }
            />

            <TouchableOpacity
              onPress={() => {
                this.changePasswordSubmission();
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
    marginBottom: '5%',
    color: '#606063',
    borderRadius: 10,
  },
});

export default ChangePassword;
