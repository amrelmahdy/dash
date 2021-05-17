import {adsSlider} from "../../config";
import axios from 'axios'
import * as types from "../types/reduxTypes";

export const getAdsSlider = () => {
    return (dispatch, getState) => {
        axios.get(adsSlider).then(res => {
            if(res.data.Error.status === true){
                dispatch({
                    type: types.GET_ADS_SLIDER,
                    payload: res.data.Response,
                })
            }

        }).catch(err => {
            dispatch({
                type: types.OFFLINE_CONNECTION,
                payload: true
            });
        })
    }
};