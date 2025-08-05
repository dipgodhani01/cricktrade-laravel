import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getPlayersByTeamApi } from "../../utils/api";

axios.defaults.withCredentials = true;

export const getPlayersByTeam = createAsyncThunk(
  "players/getPlayersByTeam",
  async (teamId, { rejectWithValue }) => {
    console.log("Team Id : ", teamId);

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
    playersByTeam: [],
  },

  extraReducers: (builder) => {
    builder
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
