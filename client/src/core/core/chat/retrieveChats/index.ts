import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { initialState } from "./initialState.ts";
import { retrieveChatsStateHandler } from "./state.ts";
import { ChatUseCases } from "../types.ts";
import { Chat } from "@dto";

export const retrieveChatsSlice = createSlice({
  name: ChatUseCases.retrieveChats,
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Chat>) => {
      state.chats = [...state.chats, action.payload];
    },
  },
  extraReducers: retrieveChatsStateHandler(),
});

export const { addMessage } = retrieveChatsSlice.actions;

export default retrieveChatsSlice.reducer;
