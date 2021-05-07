import axios from 'axios';
import {baseLink, categoriesURL} from '../../config';
import * as types from '../types/reduxTypes';

export const getAllCategories = () => {
  return (dispatch, getState) => {
    dispatch({
      type: types.GET_ALL_CATEGORIES_STARTED,
      payload: null,
    });
    axios
      .get(categoriesURL)
      .then(res => {
        if (res.data.Error.status === true) {
          dispatch({
            type: types.OFFLINE_CONNECTION,
            payload: false,
          });

          dispatch({
            type: types.GET_ALL_CATEGORIES_SUCCEEDED,
            payload: res.data.Response,
          });
        }
      })
      .catch(err => {
        dispatch({
          type: types.OFFLINE_CONNECTION,
          payload: true,
        });
      });
  };
};

export const clearCategories = () => {
  return (dispatch, getState) => {
    dispatch({
      type: types.CLEAR_CATEGORIES,
      payload: [],
    });
  };
};
