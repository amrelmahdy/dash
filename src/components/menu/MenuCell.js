import React, {Component} from 'react'
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native'

class MenuCell extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={this.props.menu.image}/>
                <Text style={{marginLeft: "15%"}}>{this.props.menu.name}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        alignItems: 'center',
        flexDirection: "row",
        marginTop: "2%",
        marginBottom: "5%"
    },
    text: {
        marginLeft: 12,
        fontSize: 16,
    },
    photo: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
});


export default MenuCell;
