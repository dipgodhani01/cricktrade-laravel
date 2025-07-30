import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { createPlayerApi } from "../../utils/api";

axios.defaults.withCredentials = true;

export const createPlayer = createAsyncThunk(
  "players/createPlayer",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await createPlayerApi(formData);
      toast.success(response.data.message);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// export const getUserAuctions = createAsyncThunk(
//   "players/getUserAuctions",
//   async (userId, { rejectWithValue }) => {
//     try {
//       const response = await getUserAuctionsApi(userId);
//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Something went wrong"
//       );
//     }
//   }
// );
// export const getAuctionById = createAsyncThunk(
//   "players/getAuctionById",
//   async (auctionId, { rejectWithValue }) => {
//     try {
//       const response = await getAuctionByIdApi(auctionId);
//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Something went wrong"
//       );
//     }
//   }
// );

// export const deleteAuction = createAsyncThunk(
//   "players/deleteAuction",
//   async ({ auctionId }, { rejectWithValue, dispatch, getState }) => {
//     try {
//       const response = await deleteAuctionApi(auctionId);
//       const userId = getState().user.user.user_id;
//       dispatch(getUserAuctions(userId));
//       toast.success(response.data.message);
//       return response.data.data;
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong");
//       return rejectWithValue(error.response?.data?.message);
//     }
//   }
// );

// export const updateAuction = createAsyncThunk(
//   "players/updateAuction",
//   async (formData, { rejectWithValue, dispatch ,getState }) => {
//     try {
//       const response = await updateAuctionApi(formData);
//       const userId = getState().user.user.user_id;
//       dispatch(getUserAuctions(userId));
//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message);
//     }
//   }
// );

const playerSlice = createSlice({
  name: "players",
  initialState: {
    loading: false,
    players: [],
    // selectedAuction: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(createPlayer.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPlayer.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createPlayer.rejected, (state) => {
        state.loading = false;
      });
    //   .addCase(getUserAuctions.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(getUserAuctions.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.auctions = action.payload;
    //   })
    //   .addCase(getUserAuctions.rejected, (state) => {
    //     state.loading = false;
    //   })
    //   .addCase(getAuctionById.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(getAuctionById.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.selectedAuction = action.payload;
    //   })
    //   .addCase(getAuctionById.rejected, (state) => {
    //     state.loading = false;
    //   })
    //   .addCase(deleteAuction.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(deleteAuction.fulfilled, (state) => {
    //     state.loading = false;
    //   })
    //   .addCase(deleteAuction.rejected, (state) => {
    //     state.loading = false;
    //   })
    //   .addCase(updateAuction.pending, (state) => {
    //     state.loading = true;
    //   })
    //   .addCase(updateAuction.fulfilled, (state) => {
    //     state.loading = false;
    //   })
    //   .addCase(updateAuction.rejected, (state) => {
    //     state.loading = false;
    //   });
  },
});

const playerReducer = playerSlice.reducer;
export default playerReducer;
