import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer, postsReducer } from "./userSlice";
import { productRecuder } from "./productSlice";
import { cartReducer } from "./cartSlice";
import storage from "redux-persist/lib/storage";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { recipeReducer } from "./recipesSlice";

const persistConfig = {
  key: "root-store",
  storage,
};

const reducers = combineReducers({
  users: userReducer,
  posts: postsReducer,
  cart: cartReducer,
  products: productRecuder,
  recipes: recipeReducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: {},
    }),
  devTools:
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
});

export default store;
