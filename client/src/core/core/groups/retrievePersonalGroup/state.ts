import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { getPersonalGroup } from "@services/core/getPersonalGroup.ts";
import { RetrievePersonalGroupState } from "./types.ts";

function retrievePersonalGroupStateHandler() {
  return (builder: ActionReducerMapBuilder<RetrievePersonalGroupState>) => {
    builder
      .addCase(getPersonalGroup.pending, (state) => {
        state.request.isRequestPending = true;
        state.request.isRequestFailure = false;
        state.request.isRequestSuccess = false;
      })
      .addCase(getPersonalGroup.fulfilled, (state, { payload }) => {
        state.request.isRequestPending = false;
        state.request.isRequestFailure = false;
        state.request.isRequestSuccess = true;
        state.group = { ...payload };
      })
      .addCase(getPersonalGroup.rejected, (state) => {
        state.request.isRequestPending = false;
        state.request.isRequestFailure = true;
        state.request.isRequestSuccess = false;
      });
  };
}

export { retrievePersonalGroupStateHandler };
