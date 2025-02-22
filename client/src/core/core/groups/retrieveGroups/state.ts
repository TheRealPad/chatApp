import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { current } from "immer";

import { getGroups } from "@services/core/getGroups.ts";
import { RetrieveGroupsState } from "./types.ts";
import { getPersonalGroup } from "@services/core/getPersonalGroup.ts";
import { deleteGroup } from "@services/core/deleteGroup.ts";

function retrieveGroupsStateHandler() {
  return (builder: ActionReducerMapBuilder<RetrieveGroupsState>) => {
    builder
      .addCase(getGroups.pending, (state) => {
        state.request.isRequestPending = true;
        state.request.isRequestFailure = false;
        state.request.isRequestSuccess = false;
      })
      .addCase(getGroups.fulfilled, (state, { payload }) => {
        state.request.isRequestPending = false;
        state.request.isRequestFailure = false;
        state.request.isRequestSuccess = true;
        state.groups = payload.map((group: any) => ({
          ...group,
          members: group.members.map((member: any) => ({
            name: member.username,
            role: member.role,
            uuid: member.uuid,
            isConnected: false,
          })),
        }));
      })
      .addCase(getGroups.rejected, (state) => {
        state.request.isRequestPending = false;
        state.request.isRequestFailure = true;
        state.request.isRequestSuccess = false;
      })
      .addCase(deleteGroup.fulfilled, (state, { payload }) => {
        state.groups = current(state.groups).filter(
          (group) => group.uuid !== payload.uuid
        );
      })
      .addCase(getPersonalGroup.fulfilled, (state, { payload }) => {
        const isGroupPresent = !!current(state.groups).find(
          (group) => group.uuid === payload.uuid
        );
        if (!isGroupPresent) {
          state.groups = [...state.groups, { ...payload }];
        }
      });
  };
}

export { retrieveGroupsStateHandler };
