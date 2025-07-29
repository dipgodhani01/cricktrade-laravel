import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import layoutReducer from "./slice/layoutSlice";
import auctionReducer from "./slice/auctionSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    sidebar: layoutReducer,
    auctions: auctionReducer,
  },
});

export default store;
