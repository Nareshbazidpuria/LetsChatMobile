import { configureStore } from "@reduxjs/toolkit";
import { searchText } from "./common";

export default configureStore({ reducer: { searchText } });
