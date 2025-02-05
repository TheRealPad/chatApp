import { createSlice } from "@reduxjs/toolkit";

import { initialState } from "./initialState.ts";
import { removeFriendStateHandler } from "./state.ts";
import { FriendsUseCases } from "../types.ts";

export const removeFriendSlice = createSlice({
  name: FriendsUseCases.removeFriend,
  initialState,
  reducers: {},
  extraReducers: removeFriendStateHandler(),
});

export default removeFriendSlice.reducer;
