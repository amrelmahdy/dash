import {Dimensions, StyleSheet} from 'react-native';
import { Colors } from './../../theme/theme'

export default StyleSheet.create({
  button: {
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
    textAlign: 'center',
  },
  activityIndicator: {
    position: 'absolute',
    top: '50%',
    left: '60%',
    zIndex: 11,
  },
});
