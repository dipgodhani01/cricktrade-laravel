import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser, googleAuth, logoutApi } from "../../utils/api";
import { toast } from "react-toastify";

export const loginWithGoogle = createAsyncThunk(
  "user/loginWithGoogle",
  async (code, { rejectWithValue }) => {
    try {
      const response = await googleAuth(code);
      const { user } = response.data;
      toast.success(response.data.message);

      return { user };
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Login failed");
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutApi();
      toast.success(response.data.message);
      return;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Logout failed");
    }
  }
);
export const fetchAuthenticatedUser = createAsyncThunk(
  "user/fetchAuthenticatedUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUser();      
      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
initialState: {
  user: null,
  loading: true, 
  error: null,
},
  reducers: {
    clearUserState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
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
        state.user = action.payload.user;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAuthenticatedUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAuthenticatedUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchAuthenticatedUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { clearUserState } = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
