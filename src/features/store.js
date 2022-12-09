import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import appApi from "../services/appApi";

// persist store
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

// reducers
const reducer = combineReducers({
  user: userSlice,
  [appApi.reducerPath]: appApi.reducer,
});

//persist store
const persistConfig = {
  key: "root",
  storage,
  blackList: [appApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, reducer);

//create store
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, appApi.middleware],
});

export default store;
