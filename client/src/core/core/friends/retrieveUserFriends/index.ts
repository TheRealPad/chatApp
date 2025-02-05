import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { initialState } from "./initialState.ts";
import { retrieveUserFriendsStateHandler } from "./state.ts";
import { FriendsUseCases } from "../types.ts";
import { Identifiable, User } from "@dto";

export const sendChatSlice = createSlice({
  name: FriendsUseCases.retrieveUserFriends,
  initialState,
  reducers: {
    getConnectedFriends: (
      state,
      action: PayloadAction<Identifiable<User>[]>
    ) => {
      state.friends = state.friends.map((friend) => ({
        ...friend,
        isConnected: !!action.payload.find((u) => u.uuid === friend.uuid),
      }));
    },
  },
  extraReducers: retrieveUserFriendsStateHandler(),
});

export const { getConnectedFriends } = sendChatSlice.actions;

export default sendChatSlice.reducer;
