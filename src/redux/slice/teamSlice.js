import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import {
  createTeamApi,
  deleteTeamApi,
  getAllTeamsApi,
  getTeamByIdApi,
  updateTeamApi,
} from "../../utils/api";

axios.defaults.withCredentials = true;

export const createTeam = createAsyncThunk(
  "teams/createTeam",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await createTeamApi(formData);
      toast.success(response.data.message);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const getAllTeams = createAsyncThunk(
  "teams/getAllTeams",
  async (auctionId, { rejectWithValue }) => {    
    try {
      const response = await getAllTeamsApi(auctionId);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);
export const getTeamById = createAsyncThunk(
  "teams/getTeamById",
  async (teamId, { rejectWithValue }) => {
    try {
      const response = await getTeamByIdApi(teamId);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const updateTeam = createAsyncThunk(
  "teams/updateTeam",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await updateTeamApi(formData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const deleteTeam = createAsyncThunk(
  "teams/deleteTeam",
  async ({ teamId }, { rejectWithValue }) => {
    try {
      const response = await deleteTeamApi(teamId);
      toast.success(response.data.message);
      return response.data.data.id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const teamSlice = createSlice({
  name: "teams",
  initialState: {
    loading: false,
    teams: [],
    selectedTeam: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(createTeam.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTeam.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createTeam.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAllTeams.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTeams.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = action.payload;
      })
      .addCase(getAllTeams.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getTeamById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTeamById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTeam = action.payload;
      })
      .addCase(getTeamById.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateTeam.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTeam.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTeam = action.payload;
        const index = state.teams.findIndex((p) => p.id === updatedTeam.id);
        if (index !== -1) {
          state.teams[index] = updatedTeam;
        }
      })
      .addCase(updateTeam.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteTeam.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTeam.fulfilled, (state, action) => {
        state.loading = false;
        const deleteTeamId = action.payload;
        state.teams = state.teams.filter((p) => p.id !== deleteTeamId);
      })
      .addCase(deleteTeam.rejected, (state) => {
        state.loading = false;
      });
  },
});

const teamReducer = teamSlice.reducer;
export default teamReducer;
