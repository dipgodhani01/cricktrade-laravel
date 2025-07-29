import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { createAuctionApi } from "../../utils/api";

axios.defaults.withCredentials = true;

export const createAuction = createAsyncThunk(
  "auctions/createAuction",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await createAuctionApi(formData);
      toast.success(response?.data?.message);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

const auctionSlice = createSlice({
  name: "auctions",
  initialState: {
    loading: false,
    error: null,
    auctions: [],
    selectedAuction: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(createAuction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAuction.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createAuction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const auctionReducer = auctionSlice.reducer;
export default auctionReducer;
