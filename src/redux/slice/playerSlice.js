import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import {
  createPlayerApi,
  deletePlayerApi,
  getAllPlayersApi,
  getPlayerByIdApi,
  getPlayersByTeamApi,
  soldPlayerApi,
  unsoldPlayerApi,
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

export const soldPlayer = createAsyncThunk(
  "players/soldPlayer",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await soldPlayerApi(formData);
      return response.data.data.player;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const unsoldPlayer = createAsyncThunk(
  "players/unsoldPlayer",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await unsoldPlayerApi(formData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);
export const getPlayersByTeam = createAsyncThunk(
  "players/getPlayersByTeam",
  async (teamId, { rejectWithValue }) => {    
    try {
      const response = await getPlayersByTeamApi(teamId);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const playerSlice = createSlice({
  name: "players",
  initialState: {
    playerLoading: false,
    players: [],
    selectedPlayer: null,
    playersByTeam: [],
  },

  extraReducers: (builder) => {
    builder
      .addCase(createPlayer.pending, (state) => {
        state.playerLoading = true;
      })
      .addCase(createPlayer.fulfilled, (state) => {
        state.playerLoading = false;
      })
      .addCase(createPlayer.rejected, (state) => {
        state.playerLoading = false;
      })
      .addCase(getAllPlayers.pending, (state) => {
        state.playerLoading = true;
      })
      .addCase(getAllPlayers.fulfilled, (state, action) => {
        state.playerLoading = false;
        state.players = action.payload;
      })
      .addCase(getAllPlayers.rejected, (state) => {
        state.playerLoading = false;
      })
      .addCase(getPlayerById.pending, (state) => {
        state.playerLoading = true;
      })
      .addCase(getPlayerById.fulfilled, (state, action) => {
        state.playerLoading = false;
        state.selectedPlayer = action.payload;
      })
      .addCase(getPlayerById.rejected, (state) => {
        state.playerLoading = false;
      })
      .addCase(updatePlayer.pending, (state) => {
        state.playerLoading = true;
      })
      .addCase(updatePlayer.fulfilled, (state, action) => {
        state.playerLoading = false;
        const updatedPlayer = action.payload;
        const index = state.players.findIndex((p) => p.id === updatedPlayer.id);
        if (index !== -1) {
          state.players[index] = updatedPlayer;
        }
      })
      .addCase(updatePlayer.rejected, (state) => {
        state.playerLoading = false;
      })
      .addCase(updateMinimumBid.pending, (state) => {
        state.playerLoading = true;
      })
      .addCase(updateMinimumBid.fulfilled, (state, action) => {
        state.playerLoading = false;
        const updatedPlayer = action.payload;
        const index = state.players.findIndex((p) => p.id === updatedPlayer.id);
        if (index !== -1) {
          state.players[index] = updatedPlayer;
        }
      })
      .addCase(updateMinimumBid.rejected, (state) => {
        state.playerLoading = false;
      })
      .addCase(soldPlayer.pending, (state) => {
        state.playerLoading = true;
      })
      .addCase(soldPlayer.fulfilled, (state, action) => {
        state.playerLoading = false;
        const updatedPlayer = action.payload;
        state.players = state.players.filter((p) => p.id !== updatedPlayer.id);
      })
      .addCase(soldPlayer.rejected, (state) => {
        state.playerLoading = false;
      })
      .addCase(unsoldPlayer.pending, (state) => {
        state.playerLoading = true;
      })
      .addCase(unsoldPlayer.fulfilled, (state, action) => {
        state.playerLoading = false;
        const updatedPlayer = action.payload;
        state.players = state.players.filter((p) => p.id !== updatedPlayer.id);
      })
      .addCase(unsoldPlayer.rejected, (state) => {
        state.playerLoading = false;
      })
      .addCase(deletePlayer.fulfilled, (state, action) => {
        state.playerLoading = false;
        const deletedPlayerId = action.payload;
        state.players = state.players.filter((p) => p.id !== deletedPlayerId);
      })
      .addCase(deletePlayer.rejected, (state) => {
        state.playerLoading = false;
      })
      .addCase(getPlayersByTeam.pending, (state) => {
        state.playerLoading = true;
      })
      .addCase(getPlayersByTeam.fulfilled, (state, action) => {
        state.playerLoading = false;
        state.playersByTeam = action.payload;
      })
      .addCase(getPlayersByTeam.rejected, (state) => {
        state.playerLoading = false;
      });
  },
});

const playerReducer = playerSlice.reducer;
export default playerReducer;
