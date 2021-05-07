import * as types from "./../types/reduxTypes";

let initState = {
    cart: [],
    cartIsLoading: false,
    addingToCart: false,
};


const cartReducer = (state = initState, action) => {
    switch (action.type) {
        case types.GET_SHOPPING_CART:
            state = {
                ...state,
                cart: action.payload,
                cartIsLoading: false,
            };
            break;
        case types.CLEAR_CART:
            state = {
                ...state,
                cart: [],
                cartIsLoading: false,
            };
            break;
        case types.ADD_TO_CART:
            state = {
                ...state,
                cart: [],
                cartIsLoading: false,
            };
            break;
        case types.START_LOADING:
            state = {
                ...state,
                cartIsLoading: true,
            };
            break;
        default:
            return state;
    }

    return state;
};


export default cartReducer;



