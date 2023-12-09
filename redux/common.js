import { createSlice } from "@reduxjs/toolkit";

const search = createSlice({
  name: "searchText",
  initialState: "",
  reducers: {
    setSearchText: (state, action) => action.payload,
  },
});

export const { setSearchText } = search.actions;
export const searchText = search.reducer;