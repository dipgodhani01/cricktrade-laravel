import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import {
  createPlayerApi,
  deletePlayerApi,
  getAllPlayersApi,
  getPlayerByIdApi,
  updateMinimumBidApi,
  updatePlayerApi,
} from "../../utils/api";

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

export const getAllPlayers = createAsyncThunk(
  "players/getAllPlayers",
  async (auctionId, { rejectWithValue }) => {
    try {
      const response = await getAllPlayersApi(auctionId);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);
export const getPlayerById = createAsyncThunk(
  "players/getPlayerById",
  async (playerId, { rejectWithValue }) => {
    try {
      const response = await getPlayerByIdApi(playerId);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const updatePlayer = createAsyncThunk(
  "players/updatePlayer",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await updatePlayerApi(formData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
export const updateMinimumBid = createAsyncThunk(
  "players/updateMinimumBid",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await updateMinimumBidApi(formData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const deletePlayer = createAsyncThunk(
  "players/deletePlayer",
  async ({ playerId }, { rejectWithValue }) => {
    try {
      const response = await deletePlayerApi(playerId);
      toast.success(response.data.message);      
      return response.data.data.id;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const playerSlice = createSlice({
  name: "players",
  initialState: {
    loading: false,
    players: [],
    selectedPlayer: null,
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
      })
      .addCase(getAllPlayers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPlayers.fulfilled, (state, action) => {
        state.loading = false;
        state.players = action.payload;
      })
      .addCase(getAllPlayers.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getPlayerById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPlayerById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPlayer = action.payload;
      })
      .addCase(getPlayerById.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updatePlayer.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePlayer.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPlayer = action.payload;
        const index = state.players.findIndex((p) => p.id === updatedPlayer.id);
        if (index !== -1) {
          state.players[index] = updatedPlayer;
        }
      })
      .addCase(updatePlayer.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateMinimumBid.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMinimumBid.fulfilled, (state, action) => {
        state.loading = false;
        const updatedPlayer = action.payload;
        const index = state.players.findIndex((p) => p.id === updatedPlayer.id);
        if (index !== -1) {
          state.players[index] = updatedPlayer;
        }
      })

      .addCase(updateMinimumBid.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deletePlayer.fulfilled, (state, action) => {
        state.loading = false;
        const deletedPlayerId = action.payload;
        state.players = state.players.filter((p) => p.id !== deletedPlayerId);
      })

      .addCase(deletePlayer.rejected, (state) => {
        state.loading = false;
      });
  },
});

const playerReducer = playerSlice.reducer;
export default playerReducer;
