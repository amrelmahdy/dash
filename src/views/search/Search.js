import React, {Component} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ProductCell from '../../components/home/ProductCell';
import {getAllCategories} from './../../store/actions/categoryActions';
import {
  clearProducts,
  getMoreProducts,
  getProducts,
} from './../../store/actions/productActions';
import {connect} from 'react-redux';
import {Image, SearchBar, Icon} from 'react-native-elements';
import {home} from '../../constants/images';
import ConnectionError from '../../components/ConnectionError';

class Search extends Component {
  constructor(props) {
    super(props);
    this.searchBar = React.createRef();
  }

  static navigationOptions = {
    title: 'Search',
  };

  state = {
    isLoading: false,
    search: '',
    showSearchLoading: false,
    updateSearch: false,
    isLoadingMore: false,
    limit: 10,
    offset: 0,
  };

  componentDidMount = async () => {
    //await this.props.clearProducts();
    this.props.getProducts(-1, '');
    this.searchRef.focus();
  };

  updateSearch = search => {
    this.setState({
      search,
      updateSearch: true,
    });

    if (search === '') {
      this.props.clearProducts();
      this.setState({
        updateSearch: true,
      });
    } else {
      this.props.clearProducts();
      this.props.getProducts(-1, search);
      this.setState({
        updateSearch: false,
      });
    }
  };

  handleRefresh = async () => {
    this.setState({
      isLoading: true,
    });
    this.props.clearProducts();
    await this.props.getProducts(-1);
    await this.props.getAllCategories();

    this.setState({
      isLoading: false,
      isLoadingMore: false,
      limit: 10,
      offset: 0,
    });
  };

  renderHeader = () => {
    return (
      <View>
        <View>
          <SearchBar
            ref={searchRef => (this.searchRef = searchRef)}
            containerStyle={styles.searchBar}
            inputContainerStyle={{backgroundColor: '#EEE'}}
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
            value={this.state.search}
            //lightTheme={true}
            returnKeyType="search"
            autoFocus={true}
            cancelIcon={() => null}
          />
        </View>
      </View>
    );
  };

  renderFooter = () => {
    return this.state.isLoadingMore ? <ActivityIndicator /> : null;
  };

  handleLoadMore = () => {
    this.setState({isLoadingMore: true});
    setTimeout(async () => {
      await this.props.getMoreProducts(
        -1,
        this.state.search,
        this.state.limit,
        this.state.offset + 10,
      );
      this.setState({
        isLoadingMore: false,
        offset: this.state.offset + 10,
      });
    }, 1500);
  };

  renderEmptyComponent = () => {
    if (this.props.productsIsLoading) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={home.empty} />
        <Text style={{textAlign: 'center', marginTop: 10}}>
          No Data to show
        </Text>
      </View>
    );
  };

  render() {

    console.log("is000", this.props.productsIsLoading)

    /* CENTER EMPTY CONTENT */
    let containerComponentStyle = {justifyContent: 'center'};
    if (this.props.products && this.props.products.length === 0) {
      containerComponentStyle = {
        ...containerComponentStyle,
        flex: 1,
      };
    }

    if (this.props.productsIsLoading && !this.props.isOfflineConnection) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color="#333" />
        </View>
      );
    } else {
    }

    return (
      <View style={styles.container}>
        {this.props.isOfflineConnection ? (
          <View>
            <ConnectionError onPress={() => this.componentDidMount()} />
          </View>
        ) : (
          <FlatList
            data={this.props.products ? this.props.products : []}
            renderItem={({item, index}) => (
              <ProductCell search={true} index={index} product={item} />
            )}
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
            disableVirtualization
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
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
    isOfflineConnection,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
