import { createSlice } from "@reduxjs/toolkit";

import { initialState } from "./initialState.ts";
import { retrieveChatsStateHandler } from "./state.ts";
import { ChatUseCases } from "../types.ts";

export const retrieveChatsSlice = createSlice({
  name: ChatUseCases.retrieveChats,
  initialState,
  reducers: {
    retrieveChats: (state) => {
      state.chats = [...state.chats];
    },
  },
  extraReducers: retrieveChatsStateHandler(),
});

export const { retrieveChats } = retrieveChatsSlice.actions;

export default retrieveChatsSlice.reducer;
