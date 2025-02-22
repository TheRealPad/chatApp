import { createSlice } from "@reduxjs/toolkit";

import { initialState } from "./initialState.ts";
import { retrievePersonalGroupStateHandler } from "./state.ts";
import { GroupsUseCases } from "../types.ts";

export const retrievePersonalGroupSlice = createSlice({
  name: GroupsUseCases.retrievePersonalGroup,
  initialState,
  reducers: {},
  extraReducers: retrievePersonalGroupStateHandler(),
});

export const {} = retrievePersonalGroupSlice.actions;

export default retrievePersonalGroupSlice.reducer;
