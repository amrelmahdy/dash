import * as types from "./../types/reduxTypes";

let initState = {
    isOfflineConnection: false,
};


const globalReducer = (state = initState, action) => {
    switch (action.type) {
        case types.OFFLINE_CONNECTION:
            state =  {
                ...state,
                isOfflineConnection: action.payload,
            };
            break;
        default:
            return state;
    }
    return  state;
};


export default globalReducer;



