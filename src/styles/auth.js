import {Dimensions, StyleSheet} from 'react-native';
import {appColors, colors} from './colors';

const {width, height} = Dimensions.get('window');

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  background: {
    flex: 1,
  },
  header: {
    // marginTop: "10%",
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    //backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },

  form: {
    height: 'auto',
    //backgroundColor: 'rgba(0, 0, 0, 0.5)',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 10,
    padding: 20,
    paddingBottom: 20,
    //borderWidth: 2,
    //borderColor: '#00000010',
  },

  form_title: {
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 30,
    color: appColors.white,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.33)',
    marginBottom: 30,
    paddingLeft: 15,
    fontSize: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ffffff10',
    color: appColors.white,
  },
  button: {
    backgroundColor: appColors.white,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 20,
    width: '40%',
    marginLeft: '30%',
    marginRight: '30%',
    height: 35,
    justifyContent: 'center',
  },
  button_text: {
    color: appColors.red,
    textAlign: 'center',
  },
  footer: {
    // flex: 2,
  },
  activityIndicator: {
    color: appColors.red,
    position: 'absolute',
    top: '50%',
    left: '60%',
    zIndex: 11,
  },
});
