
import React, {Component} from "react";
import {
    FlatList,
    ActivityIndicator,
    View,
    Platform,
    Dimensions,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import {images} from "../../constants/images";
import {connect} from "react-redux";
import {getAdsSlider} from "../../store/actions/homeActions";
import {getAllCategories} from "../../store/actions/categoryActions";
import {
    clearProducts,
    getMoreProducts,
    getProducts
} from "../../store/actions/productActions";
import CategoryCell from "../../components/home/CategoryCell";
import ConnectionError from "../../components/ConnectionError";
import {goToProductDetails} from "../../helpers/magicServices";
import {Image} from 'react-native-elements'


const {width} = Dimensions.get("window");


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            currentIndex: 0,
        };

        this.scrollView = React.createRef();
    }

    static navigationOptions = ({navigation}) => ({
        headerTitle: Platform.OS === "ios" ? <Image source={images.logoTitle}/> : "Home"
    });


    componentDidMount() {
        this.props.getAllCategories();
        this.props.getAdsSlider(),
            this.timer = setInterval(() => {
                this.handleSlider();
            }, 3000)
    }


    componentWillUnmount() {
        clearInterval(this.timer);
    }

    handleRefresh = async () => {
        this.setState({
            isLoading: true
        });
        await this.props.getAllCategories();

        this.setState({
            isLoading: false
        });
    };


    handleSlider = () => {
        const newIndex = this.state.currentIndex + 1;
        /* if(newIndex < this.state.sliderImages.length){

             this.setState({
                 currentIndex: newIndex
             }, () => {
                 this.scrollView.current.scrollTo({
                     y: 0,
                     x:  newIndex * width ,
                     animated: "true"
                 });
             });

         } else {

             this.setState({
                 currentIndex: 0
             }, () => {
                 this.scrollView.current.scrollTo({
                     x: 0 ,
                     animated: "true"
                 });
             });
         }*/
    };

    handleSliderScroll = event => {
        const viewSize = event.nativeEvent.layoutMeasurement.width;
        const {contentOffset} = event.nativeEvent;
        const currentIndex = Math.floor(contentOffset.x / viewSize);
        console.log("index", currentIndex);
        /*if(this.state.currentIndex !== currentIndex){
            this.setState({currentIndex});
        }*/
        this.setState({currentIndex});
    };

    renderHeader = () => {

        return (
            <View style={{height: 130, marginBottom: 8}}>
                <View style={{flex: 1}}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        ref={this.scrollView}
                        onMomentumScrollEnd={this.handleSliderScroll}
                        keyboardShouldPersistTaps='always'
                    >
                        {this.props.adsSlider && this.props.adsSlider.length ? this.props.adsSlider.map((item, index) => {
                            return (
                                    <TouchableOpacity  key={index} style={{position: "relative"}}   onPress={() => {goToProductDetails(item.product_id)}}>
                                        <Image source={{uri: item.image}} style={{width: width, height: 130}}
                                               resizeMode={'cover'}/>
                                        <View style={{
                                            position: "absolute",
                                            flexDirection: "row",
                                            width: width,
                                            height: "100%",
                                            justifyContent: "center",
                                            alignItems: "flex-end",
                                            paddingBottom: 10
                                        }}>
                                            {Array.from({length: this.props.adsSlider.length}).map((_, i) => {
                                                const bgColor = i === this.state.currentIndex ? "#DDD" : "transparent";
                                                return (<View key={i} style={
                                                    {
                                                        width: 10,
                                                        height: 10,
                                                        backgroundColor: bgColor,
                                                        margin: 5,
                                                        borderWidth: 1,
                                                        borderColor: "#DDD",
                                                        borderRadius: 9,
                                                    }}>
                                                </View>)
                                            })}
                                        </View>
                                    </TouchableOpacity>
                            )
                        }) : null}
                    </ScrollView>
                </View>
            </View>
        );
    };

    render() {
        if (this.props.categoriesIsLoading) {
            return (
                <View
                    style={{flex: 1, justifyContent: "center", alignItems: "center"}}
                >
                    <ActivityIndicator/>
                </View>
            );
        } else {
            return (
                <View style={{flex: 1}}>
                    {this.props.isOfflineConnection ?
                        <View>
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
                            refreshing={this.state.isLoading}
                            onRefresh={() => this.handleRefresh()}
                            ListEmptyComponent={() => this.renderEmptyComponent()}
                        />
                    }
                </View>
            );
        }
    }
}

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
        getAdsSlider: () => dispatch(getAdsSlider()),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
