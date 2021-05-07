import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Image} from 'react-native-elements';
import {NavigationServices} from '../../api/NavigationService';

export default class CategoryCell extends Component {
  componentDidMount() {}

  render() {
    const {name, image} = this.props.category;

    const {index} = this.props;

    const {width} = Dimensions.get('window');
    const itemWidth = (width - 30) / 2;

    //const categoryHandledImage = index === 0 ? home.allProducts : {uri: image};

    return (
      <View
        style={[
          styles.container,
          {
            height: 'auto',
            maxWidth: itemWidth,
            marginHorizontal: index % 2 === 0 ? 10 : 0,
            marginBottom: 10,
          },
        ]}>
        <TouchableOpacity
          style={[styles.categoryImageContainer, {}]}
          onPress={() => {
            NavigationServices.navigate('Products', {
              category: this.props.category,
            });
          }}>
          <View
            style={{
              height: 120,
              width: '100%',
              alignItems: 'stretch',
              justifyContent: 'center',
              position: 'relative',
            }}>
            <Image
              source={{uri: image}}
              style={{
                width: '100%',
                height: '100%',
                flexGrow: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 3,
              }}
            />
            <View
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                backgroundColor: '#333',
                opacity: 0.5,
                right: 0,
                width: '100%',
                height: '100%',
                borderRadius: 3,
              }}
            />
            <Text
              style={{
                position: 'absolute',
                fontSize: 15,
                color: '#FFF',
                fontWeight: 'bold',
                textAlign: 'center',
                left: 0,
                right: 0,
                textTransform: 'capitalize',
              }}>
              {name}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    flexDirection: 'row',
    //margin: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#333',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    elevation: 3,
  },
  categoryImageContainer: {
    flex: 1,
  },

  category: {
    borderColor: '#aaa',
    borderWidth: 1,
  },
  categoryText: {
    paddingTop: 5,
    fontSize: 12,
    textAlign: 'center',
    textTransform: 'capitalize',
  },

  activeCategory: {
    borderColor: '#ea0a2a',
    borderWidth: 2,
  },
  activeCategoryText: {
    color: '#ea0a2a',
  },
});
