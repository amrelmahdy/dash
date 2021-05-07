import * as types from './../types/reduxTypes';

let initState = {
  products: [],
  productsIsLoading: false,
};

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case types.GET_ALL_PRODUCTS_STARTED:
      return {
        ...state,
        productsIsLoading: true,
      };

    case types.GET_ALL_PRODUCTS_SUCCEEDED:
      return {
        ...state,
        products: [...action.payload],
        productsIsLoading: false,
      };
    case 'GET_MORE_PRODUCTS':
      return {
        ...state,
        products: [...state.products, ...action.payload],
        productsIsLoading: false,
      };
    case 'CLEAR_PRODUCTS':
      return {
        ...state,
        products: [],
        productsIsLoading: true,
      };
    default:
      return state;
  }
};

export default productReducer;
