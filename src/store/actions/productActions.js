import axios from "axios";
import {productsURL} from "../../config";
import * as types from "./../types/reduxTypes"

export const getProducts = (category_id = -1, keyword = null, limit = 10, offset = 0)  => {
    //console.log("cat", category_id);
    return (dispatch, getState) => {
        dispatch({
            type: types.GET_ALL_PRODUCTS_STARTED,
            payload: null
        })
        axios.post(productsURL, {category_id, keyword , limit, offset}).then(res => {
            if (res.data.Error.status === true) {
                dispatch({
                    type: types.OFFLINE_CONNECTION,
                    payload: false
                });

                dispatch({
                    type: types.GET_ALL_PRODUCTS_SUCCEEDED,
                    payload: res.data.Response
                })
            }
        }).catch(err => {
            dispatch({
                type: types.OFFLINE_CONNECTION,
                payload: true
            })
        })
    }
};


export const getMoreProducts = (category_id, keyword = null, limit = 10, offset = 0)  => {
    //console.log("cat", category_id);
    return (dispatch, getState) => {
        axios.post(productsURL, {category_id, keyword , limit, offset}).then(res => {
            console.log(limit, offset);
            if (res.data.Error.status === true) {
                dispatch({
                    type: types.OFFLINE_CONNECTION,
                    payload: false
                });

                dispatch({
                    type: "GET_MORE_PRODUCTS",
                    payload: res.data.Response
                })
            }
        }).catch(err => {
            if (err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
            } else { // connections seems to be offline
                dispatch({
                    type: types.OFFLINE_CONNECTION,
                    payload: true
                })
            }
        })
    }
};

export const clearProducts = () => {
    return (dispatch, getState) => {
            dispatch({
                type: "CLEAR_PRODUCTS",
                payload: null,
            })
    }
};


