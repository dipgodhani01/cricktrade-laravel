import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import layoutReducer from "./slice/layoutSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    sidebar: layoutReducer,

  },
});

export default store;
