import React from 'react';
import {TouchableOpacity, View, Text, ActivityIndicator} from 'react-native';
import {Colors} from './../../theme';
import styles from './Button.Styles';
import {width} from './../../config';

const Button = ({
  title,
  isLoading,
  activityIndicatorColor,
  backgroundColor,
  textColor,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor}]}
      disabled={isLoading}
      onPress={onPress}>
      <View style={{position: 'relative'}}>
        <Text
          adjustsFontSizeToFit={true}
          numberOfLines={1}
          style={[styles.button_text, {color: textColor}]}>
          {title}
        </Text>
        {isLoading && (
          <View style={{position: 'absolute', left: width / 10, top: 0}}>
            <ActivityIndicator color={activityIndicatorColor} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  title: '',
  isLoading: false,
  backgroundColor: Colors.mainColor,
  textColor: Colors.white,
  activityIndicatorColor: Colors.white,
  onPress: () => {},
};

export default Button;
