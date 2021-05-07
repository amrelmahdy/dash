import {Dimensions, StyleSheet} from 'react-native';
import { Colors } from './../../theme/theme'

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  logoContainer: {
    // marginTop: "10%",
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    //backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  form: {
    //backgroundColor: '#333',
    flex: 0.8,
    justifyContent: 'flex-start',
    marginLeft: 20,
    marginRight: 20,
    //marginTop: 5,
    //marginBottom: 5,
    borderRadius: 10,
  },

  form_title: {
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 30,
    color: Colors.white,
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
    color: Colors.white,
  },
  button: {
    backgroundColor: Colors.white,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    width: '100%',
    marginLeft: '30%',
    marginRight: '30%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    //flexDirection: 'row'
  },
  button_text: {
    color: Colors.mainColor,
    textAlign: 'center',
  },
  footer: {
    // flex: 2,
  },
  activityIndicator: {
    color: Colors.mainColor,
    position: 'absolute',
    top: '50%',
    left: '60%',
    zIndex: 11,
  },
});
