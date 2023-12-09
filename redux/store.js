import { configureStore } from "@reduxjs/toolkit";
import { searchText } from "./common";

const store = configureStore({
  reducer: { searchText },
});

export default store;
