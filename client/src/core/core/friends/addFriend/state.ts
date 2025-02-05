import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { addFriend } from "@services/core/addFriend.ts";
import { AddFriendState } from "./types.ts";

function addFriendStateHandler() {
  return (builder: ActionReducerMapBuilder<AddFriendState>) => {
    builder
      .addCase(addFriend.pending, (state) => {
        state.request.isRequestPending = true;
        state.request.isRequestFailure = false;
        state.request.isRequestSuccess = false;
      })
      .addCase(addFriend.fulfilled, (state) => {
        state.request.isRequestPending = false;
        state.request.isRequestFailure = false;
        state.request.isRequestSuccess = true;
      })
      .addCase(addFriend.rejected, (state) => {
        state.request.isRequestPending = false;
        state.request.isRequestFailure = true;
        state.request.isRequestSuccess = false;
      });
  };
}

export { addFriendStateHandler };
