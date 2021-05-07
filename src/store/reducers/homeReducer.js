import * as types from "./../types/reduxTypes";

const initState = {
    adsSlider: null,
    adsSliderIsLoading: true,
};
const homeReducer = (state = initState, action) => {
    switch (action.type) {
        case types.GET_ADS_SLIDER :
            state = {
                ...state,
                adsSlider: action.payload,
                adsSliderIsLoading: false,
            };
            break;
        default:
            return state;
    }
    return state;
};

export default homeReducer