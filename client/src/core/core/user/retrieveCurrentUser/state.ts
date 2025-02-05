import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";

import { retrieveCurrentUser } from "@services/core/retrieveCurrentUser.ts";
import { RetrieveCurrentUserState } from "./types.ts";
import { Identifiable, User } from "@dto";

function retrieveCurrentUserStateHandler() {
  return (builder: ActionReducerMapBuilder<RetrieveCurrentUserState>) => {
    builder
      .addCase(retrieveCurrentUser.pending, (state) => {
        state.request.isRequestPending = true;
        state.request.isRequestFailure = false;
        state.request.isRequestSuccess = false;
      })
      .addCase(
        retrieveCurrentUser.fulfilled,
        (state, { payload }: PayloadAction<Identifiable<User>>) => {
          state.request.isRequestPending = false;
          state.request.isRequestFailure = false;
          state.request.isRequestSuccess = true;
          state.user = { ...payload, isConnected: false };
        }
      )
      .addCase(retrieveCurrentUser.rejected, (state) => {
        state.request.isRequestPending = false;
        state.request.isRequestFailure = true;
        state.request.isRequestSuccess = false;
      });
  };
}

export { retrieveCurrentUserStateHandler };
