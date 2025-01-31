import { createSlice } from "@reduxjs/toolkit";

import { initialState } from "./initialState.ts";
import { retrieveCurrentUserStateHandler } from "./state.ts";
import { UserUseCases } from "../types.ts";

export const retrieveCurrentUserSlice = createSlice({
  name: UserUseCases.retrieveCurrentUser,
  initialState,
  reducers: {},
  extraReducers: retrieveCurrentUserStateHandler(),
});

export default retrieveCurrentUserSlice.reducer;
