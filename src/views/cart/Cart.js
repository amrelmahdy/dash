import React, {Component} from 'react';
import {FlatList, StyleSheet, ActivityIndicator, Button, Image, View, StatusBar, Platform} from 'react-native';
import CartCell from "../../components/cart/CartCell";
import {cart} from "../../constants/images";
import {connect} from "react-redux";
import {getShoppingCart, clearCart} from "../../store/actions/cartActions";
import HeaderRightBtn from "../../components/cart/HeaderRightBtn";

class Cart extends Component {
    static navigationOptions = ({navigation}) => (
        {
            title: 'Cart',
            headerRight: (
                <HeaderRightBtn/>
            ),
        }
    );


    state = {
        isFetching: false,
    };


    componentDidMount() {
        this.props.getShoppingCart();
    }


    handleRefresh = () => {
        setTimeout(() => {
            //this.props.clearCart();
            this.props.getShoppingCart();
        }, 5000);
        //Alert.alert("Hey", "trying to refresh")
    };

    renderEmptyComponent = () => {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Image source={cart.empty}/>
            </View>
        )
    };


    render() {

        let containerComponentStyle = {justifyContent: "center", padding: 20};

        if (this.props.cart && this.props.cart.length === 0) {
            containerComponentStyle = {
                ...containerComponentStyle,
                flex: 1
            }
        }

        return (
            <View style={{flex: 1}}>
                <StatusBar barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}/>
                {!this.props.cartIsLoading ?
                    <FlatList

                        data={this.props.cart}
                        contentContainerStyle={containerComponentStyle}
                        renderItem={({item, index}) => {
                            return (<CartCell item={item}/>)
                        }
                        }
                        keyExtractor={item => String(item.id)}
                        refreshing={this.props.cartIsLoading}
                        onRefresh={() => this.handleRefresh()}
                        ListEmptyComponent={() => this.renderEmptyComponent()}
                    /> :
                    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                        <ActivityIndicator/>
                    </View>
                }
            </View>
        );


    }
}


const mapStateToProps = state => {
    const {cart, cartIsLoading} = state.cart;
    return {
        cart, cartIsLoading
    }
};


const mapDispatchToProps = dispatch => {
    return {
        getShoppingCart: () => dispatch(getShoppingCart()),
        clearCart: () => dispatch(clearCart()),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Cart);