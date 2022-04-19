import { createSlice } from "@reduxjs/toolkit";

const selectedSongsSlice = createSlice({
  name: "selectedSongs",
  initialState: {
    value: [],
  },
  reducers: {
    setSelectedSongs: (state, action) => {
      state.value = action.payload;
      console.log(state.value);
    },
  },
});

export const { setSelectedSongs } = selectedSongsSlice.actions;
export default selectedSongsSlice.reducer;
