import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { initialState } from "./initialState.ts";
import { retrieveGroupsStateHandler } from "./state.ts";
import { GroupsUseCases } from "../types.ts";
import { Group, Identifiable } from "@dto";
import { current } from "immer";

export const retrieveGroupsSlice = createSlice({
  name: GroupsUseCases.retrieveGroups,
  initialState,
  reducers: {
    addNewGroup: (state, action: PayloadAction<Identifiable<Group>>) => {
      state.groups = [...state.groups, action.payload];
    },
    deleteGroup: (state, { payload }: PayloadAction<Identifiable<Group>>) => {
      state.groups = current(state.groups).filter(
        (group) => group.uuid !== payload.uuid
      );
    },
  },
  extraReducers: retrieveGroupsStateHandler(),
});

export const { addNewGroup, deleteGroup } = retrieveGroupsSlice.actions;

export default retrieveGroupsSlice.reducer;
