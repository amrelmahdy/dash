import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import secureStore from './secureStore';
import { CLEAR_REDUCERS } from './types/reduxTypes';
import { authReducer, storageReducer } from './reducers';

const secureStorage = secureStore();
// persistance configuration for root reducers
const rootPersistConfig = {
  key: 'root',
  storage: secureStorage,
  blacklist: ['auth', 'storage'],
};

// persistance configuration for storage reducers
const storagePersistConfig = {
  key: 'storage',
  storage: secureStorage,
  whitelist: ['Cart'], // here we should have the reducers to be persisted,
};

// configuration for auth reducers
const authPersistConfig = {
  key: 'auth',
  storage: secureStorage,
  blacklist: [], // here we should have the reducers not to be persisted
};

const rootStorageReducer = (state, action) => {
  let updatedState = state;
  if (action.type === CLEAR_REDUCERS) {
    updatedState = undefined;
  }
  return storageReducer(updatedState, action);
};

const rootAuthReducer = (state, action) => {
  let updatedState = state;
  if (action.type === CLEAR_REDUCERS) {
    updatedState = undefined;
  }
  return authReducer(updatedState, action);
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, rootAuthReducer),
  storage: persistReducer(storagePersistConfig, rootStorageReducer),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export { store, persistor };