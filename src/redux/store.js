import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import booksReducer from './books/booksReducer';

const appReducer = combineReducers({
    books : booksReducer,
})

const persistConfig = {
    key: "primary",
    storage,
};

const rootReducer = (state, action) => {
    return appReducer(state);
  };

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export const persistor = persistStore(store);