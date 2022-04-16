import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import tokenReducer from "./tokenSlice";

const store = configureStore({
  reducer: {
    search: searchReducer,
    token: tokenReducer,
  },
});

export default store;
