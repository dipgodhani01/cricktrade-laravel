import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import {
  createAuctionApi,
  deleteAuctionApi,
  getUserAuctionsApi,
} from "../../utils/api";

axios.defaults.withCredentials = true;

export const createAuction = createAsyncThunk(
  "auctions/createAuction",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await createAuctionApi(formData);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getUserAuctions = createAsyncThunk(
  "auctions/getUserAuctions",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getUserAuctionsApi(userId);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const deleteAuction = createAsyncThunk(
  "auctions/deleteAuction",
  async ({ userId, auctionId }, { rejectWithValue, dispatch }) => {
    try {
      const response = await deleteAuctionApi({ userId, auctionId });
      dispatch(getUserAuctions(userId));
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
// const userID = getState().user.user.user_id;
// console.log(userID);

const auctionSlice = createSlice({
  name: "auctions",
  initialState: {
    success: false,
    loading: false,
    auctions: [],
    selectedAuction: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(createAuction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAuction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createAuction.rejected, (state) => {
        state.loading = false;
      })

      .addCase(getUserAuctions.fulfilled, (state, action) => {
        state.loading = false;
        state.auctions = action.payload;
      })
      .addCase(getUserAuctions.rejected, (state) => {
        state.loading = false;
        state.success = false;
      })
      .addCase(deleteAuction.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAuction.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteAuction.rejected, (state) => {
        state.loading = false;
      });
  },
});

const auctionReducer = auctionSlice.reducer;
export default auctionReducer;
