import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { getUserFriends } from "@services/core/getUserFriends.ts";
import { RetrieveUserFriendsState } from "./types.ts";
import { addFriend } from "@services/core/addFriend.ts";
import { removeFriend } from "@services/core/removeFriend.ts";

function retrieveUserFriendsStateHandler() {
  return (builder: ActionReducerMapBuilder<RetrieveUserFriendsState>) => {
    builder
      .addCase(getUserFriends.pending, (state) => {
        state.request.isRequestPending = true;
        state.request.isRequestFailure = false;
        state.request.isRequestSuccess = false;
      })
      .addCase(getUserFriends.fulfilled, (state, { payload }) => {
        state.request.isRequestPending = false;
        state.request.isRequestFailure = false;
        state.request.isRequestSuccess = true;
        state.friends = payload._embedded.users.map((user: any) => ({
          name: user.username,
          role: user.role,
          uuid: user.uuid,
          isConnected: false,
        }));
      })
      .addCase(getUserFriends.rejected, (state) => {
        state.request.isRequestPending = false;
        state.request.isRequestFailure = true;
        state.request.isRequestSuccess = false;
      })
      .addCase(addFriend.fulfilled, (state, payload) => {
        state.friends = [
          ...state.friends,
          { ...payload.meta.arg.request.friend, isConnected: false },
        ];
      })
      .addCase(removeFriend.fulfilled, (state, payload) => {
        const oldFriend = payload.meta.arg.request.friend;
        state.friends = state.friends.filter((f) => f.uuid !== oldFriend.uuid);
      });
  };
}

export { retrieveUserFriendsStateHandler };
