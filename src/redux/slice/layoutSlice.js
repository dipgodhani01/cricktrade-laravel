import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: true,
};
const layoutSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});
export const { toggleSidebar } = layoutSlice.actions;
const layoutReducer = layoutSlice.reducer;
export default layoutReducer;
