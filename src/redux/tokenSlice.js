import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    value: "",
  },
  reducers: {
    updateToken(state, action) {
      state.value = action.payload;
    },
  },
});

export const { updateToken } = tokenSlice.actions;
export default tokenSlice.reducer;
