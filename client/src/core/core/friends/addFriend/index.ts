import { createSlice } from "@reduxjs/toolkit";

import { initialState } from "./initialState.ts";
import { addFriendStateHandler } from "./state.ts";
import { FriendsUseCases } from "../types.ts";

export const addFriendSlice = createSlice({
  name: FriendsUseCases.addFriend,
  initialState,
  reducers: {},
  extraReducers: addFriendStateHandler(),
});

export default addFriendSlice.reducer;
