import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { initialState } from "./initialState.ts";
import { retrieveGroupsStateHandler } from "./state.ts";
import { GroupsUseCases } from "../types.ts";
import { Group, Identifiable } from "@dto";

export const retrieveGroupsSlice = createSlice({
  name: GroupsUseCases.retrieveGroups,
  initialState,
  reducers: {
    addNewGroup: (state, action: PayloadAction<Identifiable<Group>>) => {
      state.groups = [...state.groups, action.payload];
    },
  },
  extraReducers: retrieveGroupsStateHandler(),
});

export const { addNewGroup } = retrieveGroupsSlice.actions;

export default retrieveGroupsSlice.reducer;
