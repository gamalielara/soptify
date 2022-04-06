import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    value: "",
  },
  reducers: {
    getToken(state, action) {
      state.value = action.payload;
    },
  },
});

export const { getToken } = tokenSlice.actions;
export default tokenSlice.reducer;
