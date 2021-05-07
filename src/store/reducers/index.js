import {combineReducers} from 'redux';

import homeReducer from './homeReducer';
import userReducer from './userReducer';
import notificationReducer from './notificationReducer';
import globalReducer from './globalReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';

import categoryReducer from './categoryReducer';


const storageReducer = combineReducers({
  // let's put here the storage reducers
  Home: homeReducer,
  Cart: cartReducer,
  Notification: notificationReducer,
  Global: globalReducer,
  Product: productReducer,
  Category: categoryReducer
});

const authReducer = combineReducers({
  // let's put here the authentication reducers
  User: userReducer,
});

export {storageReducer, authReducer};
