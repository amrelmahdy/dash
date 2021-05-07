import {getDataFromAsyncStorage} from '../../config';
import {types} from '../types-/cartTypes';

export const getShoppingCart = () => {
  return (dispatch, getState) => {
    getDataFromAsyncStorage('cart')
      .then(res => {
        if (res) {
          //console.log(res);
          dispatch({
            type: types.GET_SHOPPING_CART,
            payload: JSON.parse(res),
          });
        } else {
          dispatch({
            type: types.GET_SHOPPING_CART,
            payload: [],
          });
        }
      })
      .catch(err => {
        console.log('error getting data from cache', err);
      });
  };
};

export const addToCart = (product, isMinus = false) => {
  console.log(product, isMinus);
  //console.log("......", isMinus);
  return (dispatch, getState) => {
    const {cart} = getState().storage.Cart;
    //console.log("current cart state ...", cart);
    // If item is already in the cart
    let newCart = [];
    let qty = 1;

    const inCart = cart.find(item => {
      qty = item.qty;
      return product.id === item.id;
    });

    let index = cart.findIndex(item => {
      return product.id === item.id;
    });

    if (inCart) {
      // find the item again => newCart returns only the product we need

      if (isMinus === true) {
        if (qty > 1) {
          product = {
            ...product,
            qty: qty - 1,
          };
        }
      } else {
        product = {
          ...product,
          qty: qty + 1,
        };
      }

      cart[index] = product;

      newCart = cart;
    } else {
      product = {
        ...product,
        qty: 1,
      };
      newCart = [...cart, product];
    }


    dispatch({
      type: types.GET_SHOPPING_CART,
      payload: newCart,
    });
  };
};

export const removeFromCart = product => {
  return (dispatch, getState) => {
    const {cart} = getState().storage.Cart;
    const updated = cart.filter(item => {
      console.log(item.id === product.id);
      return product.id !== item.id;
    });
    dispatch({
      type: types.GET_SHOPPING_CART,
      payload: updated,
    });
  };
};

export const emptyCart = () => {
  return {
    type: types.GET_SHOPPING_CART,
    payload: [],
  };
};

export const startLoading = () => {
  return (dispatch, getState) => {
    dispatch({
      type: types.START_LOADING,
      payload: [],
    });
  };
};

export const clearCart = () => {
  return (dispatch, getState) => {
    dispatch({
      type: types.CLEAR_CART,
      payload: [],
    });
  };
};
