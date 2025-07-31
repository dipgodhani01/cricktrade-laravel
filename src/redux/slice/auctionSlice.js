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
      .addCase(getUserAuctions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserAuctions.fulfilled, (state, action) => {
        state.loading = false;
        state.auctions = action.payload;
      })
      .addCase(getUserAuctions.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAuctionById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAuctionById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedAuction = action.payload;
      })
      .addCase(getAuctionById.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateAuction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAuction.fulfilled, (state, action) => {
        state.loading = false;
        const updatedAuction = action.payload;
        const index = state.auctions.findIndex(
          (p) => p.id === updatedAuction.id
        );
        if (index !== -1) {
          state.auctions[index] = updatedAuction;
        }
      })
      .addCase(updateAuction.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteAuction.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAuction.fulfilled, (state, action) => {
        state.loading = false;
        const deleteAuctionId = action.payload;
        state.auctions = state.auctions.filter((p) => p.id !== deleteAuctionId);
      })
      .addCase(deleteAuction.rejected, (state) => {
        state.loading = false;
      });
  },
});

const auctionReducer = auctionSlice.reducer;
export default auctionReducer;
