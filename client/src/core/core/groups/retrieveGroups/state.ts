import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { getGroups } from "@services/core/getGroups.ts";
import { RetrieveGroupsState } from "./types.ts";
import { getPersonalGroup } from "@services/core/getPersonalGroup.ts";

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
      .addCase(getPersonalGroup.fulfilled, (state, { payload }) => {
        state.groups = [...state.groups, { ...payload }];
      });
  };
}

export { retrieveGroupsStateHandler };
