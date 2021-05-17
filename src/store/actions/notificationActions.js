import axios from "axios";
import {
    getHeader,
    notificationListURL,
    notificationCountURL,
} from "../../config";
import * as types from "./../types/reduxTypes"
import {Alert} from "react-native";


export const getNotificationsList = (limit = 10, offset = 0) => {
    return (dispatch, getState) => {

        getHeader().then(header => {
            axios.post(notificationListURL, {limit, offset}, {headers: header}).then(response => {
                console.log(response);
                if (response.data.Error.status === true) {
                    dispatch({
                        type: types.GET_NOTIFICATION_LIST,
                        payload: response.data.Response
                    })
                    //console.log("response", response);
                }
            }).catch(err => {

            });
        }).catch(err => {
            console.log("Unable to get header", err)
            Alert.alert("Whoops", "Something went wrong")
        })
    }
};

export const getMoreNotifications = (limit = 10, offset = 0) => {
    return (dispatch, getState) => {

        getHeader().then(header => {
            axios.post(notificationListURL, {limit, offset}, {headers: header}).then(response => {
                console.log(response);
                if (response.data.Error.status === true) {
                    dispatch({
                        type: types.GET_MORE_NOTIFICATIONS,
                        payload: response.data.Response
                    })
                    //console.log("response", response);
                }
            }).catch(err => {

            });
        }).catch(err => {
            console.log("Unable to get header", err)
            Alert.alert("Whoops", "Something went wrong")
        })
    }
};


export const setNotificationRead = (notification_id) => {
    return (dispatch, getState) => {
        // Get old list of notification
        const {notifications} = getState().notifications;


        // find the index of the one we need to set read.
        let index = notifications.findIndex(item => {
            return notification_id === item.id
        });


        // Set the right one to read.
        notifications[index] = {...notifications[index], is_read: 1};

        // dispatch notification list again ...
        dispatch({
            type: types.GET_NOTIFICATION_LIST,
            payload: notifications,
        })
    }
};


export const setNotificationReadCount = () => {
    return (dispatch, getState) => {
        getHeader().then(header => {
            axios.post(notificationCountURL, {}, {headers: header}).then(response => {
                if (response.data.Error.status === true) {
                    dispatch({
                        type: types.SET_NOTIFICATION_READ_COUNT,
                        payload: response.data.Response
                    })
                    //console.log("response", response);
                }
            }).catch(err => {

            });
        }).catch(err => {
            console.log("Unable to get header", err)
            // Alert.alert("Whoops", "Something went wrong")
        })
      /*  // Get old list of notification
        const {notifications} = getState().notifications;
        let newList = notifications.filter(item => {
            return item.is_read !== 1
        });
        dispatch({
            type: types.SET_NOTIFICATION_READ_COUNT,
            payload: newList.length,
        })*/
    }
};


/*

export const setNotificationRead = (notification_id) => {
    return (dispatch, getState) => {
        dispatch({
            type: types.SET_NOTIFICATION_READ,
            payload: notification_id,
        })
    }
};
*/


export const clearNotificationRead = () => {
    return (dispatch, getState) => {
        dispatch({
            type: types.CLEAR_NOTIFICATION_READ,
            payload: null,
        })
    }
};
