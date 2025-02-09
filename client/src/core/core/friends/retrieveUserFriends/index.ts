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
        isConnected:
          action.payload.find((u) => u.uuid === friend.uuid) != undefined,
      }));
    },
    addFriend: (state, action: PayloadAction<Identifiable<User>>) => {
      state.friends = [...state.friends, action.payload];
    },
    removeFriend: (state, action: PayloadAction<Identifiable<User>>) => {
      state.friends = state.friends.filter(
        (f) => f.uuid !== action.payload.uuid
      );
    },
  },
  extraReducers: retrieveUserFriendsStateHandler(),
});

export const { getConnectedFriends, addFriend, removeFriend } =
  sendChatSlice.actions;

export default sendChatSlice.reducer;
