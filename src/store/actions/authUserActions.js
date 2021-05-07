import * as types from "../types/reduxTypes";
import {getItemFromAsyncStorage} from "./../../api/helpers";


export const getCurrentUser = (upUser = null)  => {
    return (dispatch, getState) => {
        if(upUser){
            dispatch({
                type: types.GET_CURRENT_USER,
                payload: upUser,
            })
        } else {
            getDataFromAsyncStorage("user").then(res => {
                if (res) {
                    const user = JSON.parse(res);
                    dispatch({
                        type: types.GET_CURRENT_USER,
                        payload: user,
                    })
                }
            }).catch(err => {
                console.log("error getting data from cache", err)
            });
        }
    }
};

export const setCurrentUser = (upUser = null)  => {
    return (dispatch, getState) => {
        if(upUser){
            dispatch({
                type: types.SET_CURRENT_USER,
                payload: upUser,
            })
        } else {
            getItemFromAsyncStorage("@auth-user").then(res => {
                if (res) {
                    const user = JSON.parse(res);
                    dispatch({
                        type: types.SET_CURRENT_USER,
                        payload: user,
                    })
                }
            }).catch(err => {
                console.log("error getting data from cache", err)
            });
        }
    }
};




export const logout = ()  => {
    return (dispatch, getState) => {
        dispatch({
            type: types.LOGOUT,
            payload: null,
        })
    }
};





