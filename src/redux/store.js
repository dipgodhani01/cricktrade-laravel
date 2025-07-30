import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import layoutReducer from "./slice/layoutSlice";
import auctionReducer from "./slice/auctionSlice";
import playerReducer from "./slice/playerSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    sidebar: layoutReducer,
    auctions: auctionReducer,
    players: playerReducer,
  },
});

export default store;
