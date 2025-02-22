import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { deleteGroup } from "@services/core/deleteGroup.ts";
import { DeleteGroupState } from "./types.ts";

function retrieveGroupsStateHandler() {
  return (builder: ActionReducerMapBuilder<DeleteGroupState>) => {
    builder
      .addCase(deleteGroup.pending, (state) => {
        state.request.isRequestPending = true;
        state.request.isRequestFailure = false;
        state.request.isRequestSuccess = false;
      })
      .addCase(deleteGroup.fulfilled, (state) => {
        state.request.isRequestPending = false;
        state.request.isRequestFailure = false;
        state.request.isRequestSuccess = true;
      })
      .addCase(deleteGroup.rejected, (state) => {
        state.request.isRequestPending = false;
        state.request.isRequestFailure = true;
        state.request.isRequestSuccess = false;
      });
  };
}

export { retrieveGroupsStateHandler };
