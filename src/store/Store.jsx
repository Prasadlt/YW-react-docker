import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { thunk } from "redux-thunk";
import LoginReducer from "./Reducer/LoginReducer";
import MemoSlice from "./Reducer/MemoReducer";

const store = configureStore({
  reducer: {
    login: LoginReducer,
    memo: MemoSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(thunk).concat(logger),
  devTools: true
});

export default store;
