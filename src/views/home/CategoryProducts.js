import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity, Image, StatusBar, Platform} from 'react-native';
import CategoryCell from "../../components/home/CategoryCell";
import {images} from "../../constants/images";
import ProductCell from "../../components/home/ProductCell";

class CategoryProducts extends Component {

    static navigationOptions = {
        title: 'CategoryProducts',
    };
    productsCategory = [
        {
            id: 1,
            name: "Stocks",
            image: images.product,
        },
        {
            id: 2,
            name: "Stocks",
            image: images.product,
        },
        {
            id: 3,
            name: "Stocks",
            image: images.product,
        },
        {
            id: 4,
            name: "Stocks",
            image: images.product,
        },
        {
            id: 5,
            name: "Stoccccks",
            image: images.product,
        },
        {
            id: 6,
            name: "Stoccccks",
            image: images.product,
        },
        {
            id: 7,
            name: "Stoccccks",
            image: images.product,
        },
        {
            id: 8,
            name: "Stoccccks",
            image: images.product,
        }

    ]
    products = [
        {
            id: 1,
            name: "Floral Mug",
            code: "G 100",
            image: images.product,
        },
        {
            id: 2,
            name: "Floral Mug",
            code: "G 100",
            image: images.product,
        },
        {
            id: 3,
            name: "Floral Mug",
            code: "G 100",
            image: images.product,
        },
        {
            id: 4,
            name: "Floral Mug",
            code: "G 100",
            image: images.product,
        },
        {
            id: 5,
            name: "Floral Mug",
            code: "G 100",
            image: images.product,
        },
        {
            id: 6,
            name: "Floral Mug",
            code: "G 100",
            image: images.product,
        },
    ]

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}/>
                <View style={{flex: 0.2}}>
                    <ScrollView contentContainerStyle={{alignItems: 'center'}}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}>
                        <FlatList
                            data={this.productsCategory}
                            renderItem={({item}) => <CategoryCell {...item}/>}
                            keyExtractor={item => String(item.id)}
                            horizontal
                        />

                    </ScrollView>
                </View>
                <View style={{flexGrow: 0.8}}>
                    <ScrollView style={{height: 150}}>
                        <FlatList
                            data={this.products}
                            renderItem={({item}) => <ProductCell {...item}/>}
                            keyExtractor={item => String(item.id)}
                            numColumns={2}
                        />
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default CategoryProducts;