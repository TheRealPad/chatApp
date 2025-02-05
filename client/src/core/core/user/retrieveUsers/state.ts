import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { RetrieveUsersState } from "./types.ts";
import { getUsers } from "@services/core/getUsers.ts";

function retrieveUsersStateHandler() {
  return (builder: ActionReducerMapBuilder<RetrieveUsersState>) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.request.isRequestPending = true;
        state.request.isRequestFailure = false;
        state.request.isRequestSuccess = false;
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.request.isRequestPending = false;
        state.request.isRequestFailure = false;
        state.request.isRequestSuccess = true;
        state.users = payload._embedded.users.map((user: any) => ({
          name: user.username,
          role: user.role,
          uuid: user.uuid,
          isConnected: false,
        }));
      })
      .addCase(getUsers.rejected, (state) => {
        state.request.isRequestPending = false;
        state.request.isRequestFailure = true;
        state.request.isRequestSuccess = false;
      });
  };
}

export { retrieveUsersStateHandler };
