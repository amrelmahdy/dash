import * as types from "./../types/reduxTypes";

let initState = {
    notifications: [],
    unreadNotificationsCount: 0,
    notificationsIsLoading: true,
};


const userReducer = (state = initState, action) => {
    switch (action.type) {
        case types.GET_NOTIFICATION_LIST:
            state =  {
                ...state,
                notifications: action.payload,
                notificationsIsLoading: false,
            };
            break;
        case types.GET_MORE_NOTIFICATIONS:
            state =  {
                ...state,
                notifications: [...state.notifications, ...action.payload],
                notificationsIsLoading: false,
            };
            break;
        case types.SET_NOTIFICATION_READ:
            state = {
                ...state,
                notificationIsRead: true,
                notificationId: action.payload,
            };
            break;
        case types.CLEAR_NOTIFICATION_READ:
            state = {
                ...state,
                notificationIsRead: false,
                notificationId: null,
            };
            break;
        case types.SET_NOTIFICATION_READ_COUNT:
            state = {
                ...state,
              unreadNotificationsCount: action.payload
            };
            break;
        default:
            return state;
    }
    return  state;
};


export default userReducer;



