import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
  },
  reducers: {
    updateInput(state, action) {
      state.query = action.payload;
    },
  },
});

export const { updateInput } = searchSlice.actions;
export default searchSlice.reducer;
