import * as types from './../types/reduxTypes';

let initState = {
  currentUser: null,
  currentUserIsLoading: true,
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case types.SET_CURRENT_USER:
      return {
        currentUser: action.payload,
      };
    case types.GET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
        currentUserIsLoading: false,
      };
    case types.LOGOUT:
      return {
        ...state,
        currentUser: null,
        currentUserIsLoading: false,
      };

    default:
      return state;
  }
};

export default userReducer;
