import React, {Component} from 'react';
import {Platform, StyleSheet, StatusBar, ActivityIndicator, View, FlatList, Text} from 'react-native';
import ProductCell from "../../components/home/ProductCell";
import {getAllCategories} from "./../../store/actions/categoryActions"
import {getProducts, clearProducts, getMoreProducts} from "./../../store/actions/productActions"
import {connect} from "react-redux";
import {Image, SearchBar} from 'react-native-elements';
import {home} from "../../constants/images";
import ConnectionError from "../../components/ConnectionError";

class Products extends Component {

    static navigationOptions = ({navigation}) => (
        {headerTitle: navigation.getParam("category").name}
     );

    state = {
        isLoading: false,
        search: '',
        showSearchLoading: false,
        currentCategory: null,
        updateSearch: false,
        isLoadingMore: false,
        limit: 10,
        offset: 0,
    };

    componentDidMount = async () => {
        await this.props.clearProducts();
        await this.props.getAllCategories();
        this.setState({
            currentCategory: this.props.navigation.getParam("category")
        }, () => {        console.log("ppp",this.state.currentCategory)
        });
        await this.props.getProducts(this.state.currentCategory.id);
    };

    updateSearch = search => {
        this.setState({
            // currentCategory: null,
            search,
            updateSearch: true
        });

        if (search === "") {
            this.props.clearProducts();
            this.props.getProducts(this.state.currentCategory ? this.state.currentCategory.id : -1);
            this.setState({
                updateSearch: false,
            });
        } else {
            this.props.clearProducts();
            // this.props.getProducts(-1, search);
            this.props.getProducts(this.state.currentCategory ? this.state.currentCategory.id : -1, search);
            this.setState({
                updateSearch: false,
            });
        }
    };

    handleRefresh = async () => {
        this.setState({
            isLoading: true,
            // currentCategory: null,
        });
        this.props.clearProducts();
        await this.props.getProducts(this.state.currentCategory ? this.state.currentCategory.id : -1);
        await this.props.getAllCategories();

        this.setState({
            isLoading: false,
            isLoadingMore: false,
            limit: 10,
            offset: 0,
        });

    };


    renderHeader = () => {
        if (this.props.categoriesIsLoading === true) {
            return (
                <View style={{height: 60, justifyContent: "center"}}>
                    <ActivityIndicator/>
                </View>
            )
        } else {
            return <View>
                <View>
                    <SearchBar
                        containerStyle={styles.searchBar}
                        inputContainerStyle={{backgroundColor: "#EEE"}}
                        placeholder="Type Here..."
                        onChangeText={this.updateSearch}
                        value={this.state.search}
                        lightTheme={true}
                    />
                </View>


            </View>
        }


    };

    renderFooter = () => {
        return this.state.isLoadingMore ? <ActivityIndicator/> : null;
    };

    handleLoadMore = () => {
        this.setState({isLoadingMore: true});
        setTimeout(async () => {
            await this.props.getMoreProducts(!this.state.currentCategory ? -1 : this.state.currentCategory.id, this.state.search, this.state.limit, this.state.offset + 10);
            this.setState({
                isLoadingMore: false,
                offset: this.state.offset + 10
            });
        }, 1500)

    };

    renderEmptyComponent = () => {
        if (this.props.productsIsLoading) {
            return (
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <ActivityIndicator/>
                </View>
            )
        }
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Image source={home.empty} />
                <Text style={{textAlign: "center", marginTop: 10}}>No Data to show</Text>
            </View>
        )
    };


    render() {
        let containerComponentStyle = {justifyContent: "center"};

        if (this.props.products && this.props.products.length === 0) {
            containerComponentStyle = {
                ...containerComponentStyle,
                flex: 1
            }
        }
        return (

            <View style={styles.container}>
                <StatusBar barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}/>

                {
                    this.props.isOfflineConnection ?
                        <View >
                            <ConnectionError onPress={() => this.componentDidMount()}/>
                        </View>
                        :

                        <FlatList
                            data={this.props.products ? this.props.products : []}
                            renderItem={({item, index}) =>
                                <ProductCell
                                    search={false}
                                    index={index}
                                    product={item}/>}
                            ListHeaderComponent={this.renderHeader()}
                            ListFooterComponent={() => this.renderFooter()}
                            ListEmptyComponent={() => this.renderEmptyComponent()}
                            keyExtractor={item => String(item.id)}
                            numColumns={2}
                            refreshing={this.state.isLoading}
                            onRefresh={() => this.handleRefresh()}
                            contentContainerStyle={containerComponentStyle}
                            /*onEndReached={() => this.handleLoadMore()}*/
                            onEndReached={({distanceFromEnd}) => {
                                if (distanceFromEnd > 0) {
                                    this.handleLoadMore();
                                }
                            }}
                            onEndReachedThreshold={0.5}
                            disableVirtualization/>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    searchBar: {
        backgroundColor: "#ffffff",
        borderBottomWidth: 0,
        borderTopWidth: 0,
    }
});


const mapStateToProps = state => {
    const {categories, categoriesIsLoading} = state.category;
    const {products, productsIsLoading} = state.product;
    const {isOfflineConnection} = state.global;
    return {
        categories,
        categoriesIsLoading,
        products,
        productsIsLoading,
        isOfflineConnection
    }
};


const mapDispatchToProps = dispatch => {
    return {
        getAllCategories: () => dispatch(getAllCategories()),
        getProducts: (category_id, keyword, limit, offset) => dispatch(getProducts(category_id, keyword, limit, offset)),
        getMoreProducts: (category_id, keyword, limit, offset) => dispatch(getMoreProducts(category_id, keyword, limit, offset)),
        clearProducts: () => dispatch(clearProducts()),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Products);