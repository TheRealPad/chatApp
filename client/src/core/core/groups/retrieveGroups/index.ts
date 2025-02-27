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
    updateGroupOrder: (state, { payload }) => {
      const selectedGroup = current(state.groups).find(
        (group) => group.uuid === payload.uuid
      );
      if (selectedGroup) {
        state.groups = state.groups.filter(
          (group) => group.uuid !== payload.uuid
        );
        state.groups = [
          {
            ...selectedGroup,
            unseenMessages: selectedGroup.unseenMessages + 1,
          },
          ...state.groups,
        ];
      }
    },
  },
  extraReducers: retrieveGroupsStateHandler(),
});

export const { addNewGroup, deleteGroup, updateGroupOrder } =
  retrieveGroupsSlice.actions;

export default retrieveGroupsSlice.reducer;
