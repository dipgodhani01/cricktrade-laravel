import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { googleAuth } from "../../utils/api";

axios.defaults.withCredentials = true;

export const loginWithGoogle = createAsyncThunk(
  "user/loginWithGoogle",
  async (code, { rejectWithValue }) => {
    try {
      const response = await googleAuth(code);
      const { token, user } = response.data;

      localStorage.setItem("cricktrade-usertoken", token);
      localStorage.setItem("cricktrade-userdata", JSON.stringify(user));
      toast.success(response?.data?.message);

      return { token, user };
    } catch (error) {
  
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("cricktrade-usertoken") || null,
    user: JSON.parse(localStorage.getItem("cricktrade-userdata")) || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("cricktrade-usertoken");
      localStorage.removeItem("cricktrade-userdata");
      state.token = null;
      state.user = null;
      toast.success("Logout Success");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
