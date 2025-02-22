import { createSlice } from "@reduxjs/toolkit";

import { initialState } from "./initialState.ts";
import { retrieveGroupsStateHandler } from "./state.ts";
import { GroupsUseCases } from "../types.ts";

export const deleteGroupSlice = createSlice({
  name: GroupsUseCases.deleteGroup,
  initialState,
  reducers: {},
  extraReducers: retrieveGroupsStateHandler(),
});

export const {} = deleteGroupSlice.actions;

export default deleteGroupSlice.reducer;
