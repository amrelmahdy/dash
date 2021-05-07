import React, {Component} from "react";
import {Image as NativeImage, ActivityIndicator, Dimensions, FlatList, Platform, StatusBar, StyleSheet, View} from "react-native";
import {images} from "../../constants/images";
import {connect} from "react-redux";
import {getAdsSlider} from "../../store/actions/homeActions";
import {clearCategories, getAllCategories} from "../../store/actions/categoryActions";
import {clearProducts, getMoreProducts, getProducts} from "../../store/actions/productActions";
import CategoryCell from "../../components/home/CategoryCell";
import ConnectionError from "../../components/ConnectionError";
import {Image} from 'react-native-elements'
import HomeSlider from "../../components/home/HomeSlider";


const {width} = Dimensions.get("window");


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        };
    }

    static navigationOptions = ({navigation}) => ({
        headerTitle: Platform.OS === "ios" ? <NativeImage source={images.logoTitle}/> : "Home"
    });


    componentDidMount() {
        this.props.clearCategories();
        this.props.getAllCategories();
        this.props.getAdsSlider();
    }


    handleRefresh = () => {
        this.props.getAdsSlider();
        this.props.getAllCategories();
    };

    renderHeader = () => {
        if (!this.props.adsSliderIsLoading) {
            if(!this.props.adsSlider.length){
                return null;
            }
            return <View style={{height: 130, marginBottom: 8}}>
                <HomeSlider styles={styles} width={width} adsSlider={this.props.adsSlider}/>
            </View>
        } else {
            return (<Image style={{width: width, height: 150}}/>)
        }
    };

    render() {


        if (this.props.categoriesIsLoading && !this.props.isOfflineConnection) {
            return (
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <StatusBar barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}/>
                    <ActivityIndicator/>
                </View>
            );
        } else {
            return (
                <View style={{flex: 1}}>
                    {this.props.isOfflineConnection ?
                        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                            <ConnectionError onPress={() => this.componentDidMount()}/>
                        </View> :

                        <FlatList
                            data={this.props.categories}
                            contentContainerStyle={{}}
                            renderItem={({item, index}) => {
                                return <CategoryCell category={item} index={index}/>;
                            }}
                            ListHeaderComponent={this.renderHeader()}
                            numColumns={2}
                            keyExtractor={item => String(item.id)}
                            refreshing={this.props.categoriesIsLoading}
                            onRefresh={() => this.handleRefresh()}
                            // ListEmptyComponent={() => this.renderEmptyComponent()}
                        />
                    }
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    buttons: {
        zIndex: 1,
        height: 15,
        marginTop: -25,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    button: {
        width: 10,
        height: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 9,
        backgroundColor: "transparent",
        overflow: "hidden",
    },
    buttonSelected: {
        opacity: 1,
        backgroundColor: "#DDD"
    },
    customSlide: {
        backgroundColor: 'grey',
    },
});
const mapStateToProps = state => {
    const {categories, categoriesIsLoading} = state.category;
    const {products, productsIsLoading} = state.product;
    const {isOfflineConnection} = state.global;
    const {adsSlider, adsSliderIsLoading} = state.home;
    return {
        categories,
        categoriesIsLoading,
        products,
        productsIsLoading,
        isOfflineConnection,
        adsSlider,
        adsSliderIsLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllCategories: () => dispatch(getAllCategories()),
        getProducts: (category_id, keyword, limit, offset) =>
            dispatch(getProducts(category_id, keyword, limit, offset)),
        getMoreProducts: (category_id, keyword, limit, offset) =>
            dispatch(getMoreProducts(category_id, keyword, limit, offset)),
        clearProducts: () => dispatch(clearProducts()),
        clearCategories: () => dispatch(clearCategories()),
        getAdsSlider: () => dispatch(getAdsSlider()),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
