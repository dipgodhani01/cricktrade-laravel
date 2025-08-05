import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import {
  createAuctionApi,
  deleteAuctionApi,
  getAuctionByIdApi,
  getUserAuctionsApi,
  updateAuctionApi,
} from "../../utils/api";

axios.defaults.withCredentials = true;

export const createAuction = createAsyncThunk(
  "auctions/createAuction",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await createAuctionApi(formData);
      toast.success(response.data.message);
    } catch (error) {
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
export const getAuctionById = createAsyncThunk(
  "auctions/getAuctionById",
  async (auctionId, { rejectWithValue }) => {
    try {
      const response = await getAuctionByIdApi(auctionId);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const updateAuction = createAsyncThunk(
  "auctions/updateAuction",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await updateAuctionApi(formData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const deleteAuction = createAsyncThunk(
  "auctions/deleteAuction",
  async ({ auctionId }, { rejectWithValue }) => {
    try {
      const response = await deleteAuctionApi(auctionId);
      toast.success(response.data.message);
      return response.data.data.id;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const auctionSlice = createSlice({
  name: "auctions",
  initialState: {
    auctionLoading: false,
    auctions: [],
    selectedAuction: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(createAuction.pending, (state) => {
        state.auctionLoading = true;
      })
      .addCase(createAuction.fulfilled, (state) => {
        state.auctionLoading = false;
      })
      .addCase(createAuction.rejected, (state) => {
        state.auctionLoading = false;
      })
      .addCase(getUserAuctions.pending, (state) => {
        state.auctionLoading = true;
      })
      .addCase(getUserAuctions.fulfilled, (state, action) => {
        state.auctionLoading = false;
        state.auctions = action.payload;
      })
      .addCase(getUserAuctions.rejected, (state) => {
        state.auctionLoading = false;
      })
      .addCase(getAuctionById.pending, (state) => {
        state.auctionLoading = true;
      })
      .addCase(getAuctionById.fulfilled, (state, action) => {
        state.auctionLoading = false;
        state.selectedAuction = action.payload;
      })
      .addCase(getAuctionById.rejected, (state) => {
        state.auctionLoading = false;
      })
      .addCase(updateAuction.pending, (state) => {
        state.auctionLoading = true;
      })
      .addCase(updateAuction.fulfilled, (state, action) => {
        state.auctionLoading = false;
        const updatedAuction = action.payload;
        const index = state.auctions.findIndex(
          (p) => p.id === updatedAuction.id
        );
        if (index !== -1) {
          state.auctions[index] = updatedAuction;
        }
      })
      .addCase(updateAuction.rejected, (state) => {
        state.auctionLoading = false;
      })
      .addCase(deleteAuction.pending, (state) => {
        state.auctionLoading = true;
      })
      .addCase(deleteAuction.fulfilled, (state, action) => {
        state.auctionLoading = false;
        const deleteAuctionId = action.payload;
        state.auctions = state.auctions.filter((p) => p.id !== deleteAuctionId);
      })
      .addCase(deleteAuction.rejected, (state) => {
        state.auctionLoading = false;
      });
  },
});

const auctionReducer = auctionSlice.reducer;
export default auctionReducer;
