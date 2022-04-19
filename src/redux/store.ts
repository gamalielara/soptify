import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import tokenReducer from "./tokenSlice";
import selectedSongsReducer from "./selectedSongsSlice";

const store = configureStore({
  reducer: {
    search: searchReducer,
    token: tokenReducer,
    selectedSongs: selectedSongsReducer,
  },
});

export default store;
