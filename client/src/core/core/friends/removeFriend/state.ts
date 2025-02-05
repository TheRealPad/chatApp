import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { removeFriend } from "@services/core/removeFriend.ts";
import { RemoveFriendState } from "./types.ts";

function removeFriendStateHandler() {
  return (builder: ActionReducerMapBuilder<RemoveFriendState>) => {
    builder
      .addCase(removeFriend.pending, (state) => {
        state.request.isRequestPending = true;
        state.request.isRequestFailure = false;
        state.request.isRequestSuccess = false;
      })
      .addCase(removeFriend.fulfilled, (state) => {
        state.request.isRequestPending = false;
        state.request.isRequestFailure = false;
        state.request.isRequestSuccess = true;
      })
      .addCase(removeFriend.rejected, (state) => {
        state.request.isRequestPending = false;
        state.request.isRequestFailure = true;
        state.request.isRequestSuccess = false;
      });
  };
}

export { removeFriendStateHandler };
