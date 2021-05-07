import * as types from '../types/reduxTypes';

let initState = {
  categories: [],
  categoriesIsLoading: true,
};

const categoryReducer = (state = initState, action) => {
  switch (action.type) {
    case types.GET_ALL_CATEGORIES_STARTED:
      return {
        ...state,
        categoriesIsLoading: true,
      };

    case types.GET_ALL_CATEGORIES_SUCCEEDED:
      return {
        ...state,
        categories: action.payload,
        categoriesIsLoading: false,
      };

    case types.CLEAR_CATEGORIES:
      return {
        ...state,
        categories: [],
        productsIsLoading: true,
      };
    default:
      return state;
  }
};

export default categoryReducer;
