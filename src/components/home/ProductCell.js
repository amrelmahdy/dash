import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Image} from 'react-native-elements';
import {
  goToProductDetails,
  goToSearchProductDetails,
} from '../../helpers/magicServices';

export default class ProductCell extends Component {
  render() {
    // fixing the width of the cell in odd numbers is taking width more than it needs to be.
    const {width} = Dimensions.get('window');
    const itemWidth = (width - 30) / 2;
    /******************************************/
    const {name, image, code} = this.props.product;
    return (
      <View
        style={[
          styles.container,
          {
            maxWidth: itemWidth,
            marginHorizontal: this.props.index % 2 === 0 ? 10 : 0,
            marginBottom: 10,
          },
        ]}>
        <TouchableOpacity
          style={styles.cell
        }
          onPress={() => {
            if (this.props.search) {
              goToSearchProductDetails(this.props.product.id);
            } else {
              goToProductDetails(this.props.product.id);
            }
          }}>
          <View style={{
              height: 120,width: '100%',
              }}>
            <Image
              source={{uri: image}}
              style={{width: '100%', height: '100%', borderRadius: 5}}
            />
          </View>
          <View
            style={{
              borderBottomColor: '#f1f1f1',
              borderBottomWidth: 1,
              marginTop: 15,
            }}></View>
          <Text
            style={{
              fontSize: 16,
              color: '#ea0a2a',
              fontWeight: 'bold',
              margin: 3,
              marginTop: 11,
            }}>
            {name}
          </Text>
          <Text style={{fontSize: 16, color: '#7f7f7f', margin: 3}}>
            {code}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    flexDirection: 'row',

    padding: 10,
    backgroundColor: '#FFF',
    shadowColor: '#AAA',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 7,
    borderRadius: 5,
    elevation: 3,
  },
  cell: {
    width: '100%',
  },
});
