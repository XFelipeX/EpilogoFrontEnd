import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import booksReducer from './books/booksReducer';
import stateUpdateReducer from './stateUpdate/stateUpdateReducer';
import userAuthReducer from './userAuth/userAuthReducer';
import stateUpdateUsersReducer from './stateUsersUpdate/stateUsersUpdateReducer';
import stateCart from './cart/cartReducer';

const rootReducer = combineReducers({
  books: booksReducer,
  stateUpdate: stateUpdateReducer,
  permissions: userAuthReducer,
  stateUpdateUsers: stateUpdateUsersReducer,
  stateCart,
});

const persistConfig = {
  key: 'primary',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
export const persistor = persistStore(store);
