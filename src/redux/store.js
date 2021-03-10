import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import booksReducer from './books/booksReducer';
import stateUpdateReducer from './stateUpdate/stateUpdateReducer';

const rootReducer = combineReducers({
  books: booksReducer,
  stateUpdate:stateUpdateReducer
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
