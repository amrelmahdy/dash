import * as types from '../types/reduxTypes';

export const setCurrentUser = (upUser = null) => {
  return {
    type: types.SET_CURRENT_USER,
    payload: upUser,
  };
};

export const logout = () => {
  return {
    type: types.LOGOUT,
    payload: null,
  };
};
