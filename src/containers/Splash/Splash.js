import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  Dimensions,
  Platform,
} from 'react-native';
import styles from './Splash.Styles';
import {Images} from './../../theme/images';
import {NavigationServices} from './../../api/NavigationService';
import {getItemFromAsyncStorage} from './../../api/helpers';
import {setCurrentUser} from './../../store/actions/userActions';
import {useDispatch, useSelector} from 'react-redux';
import RNBootSplash from 'react-native-bootsplash';

const SplashScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.User);

  useEffect(() => {
    getItemFromAsyncStorage('@auth-user')
      .then(res => {
        if (res) {
          const user = JSON.parse(res);
          dispatch(setCurrentUser(user));
        }
        navigate(res)
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const navigate = res => {
    setTimeout(() => {
      NavigationServices.reset(0, [{name: res ? 'Main' : 'Auth'}]);
      RNBootSplash.hide({fade: true});
    }, 3000);
  };

  return <View />;
};

export default SplashScreen;
