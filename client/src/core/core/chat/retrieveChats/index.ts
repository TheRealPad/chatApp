import { createSlice } from "@reduxjs/toolkit";

import { initialState } from "./initialState.ts";
import { retrieveChatsStateHandler } from "./state.ts";
import { ChatUseCases } from "../types.ts";

export const retrieveChatsSlice = createSlice({
  name: ChatUseCases.retrieveChats,
  initialState,
  reducers: {
    getChat(state, action) {
      const index = state.groups.findIndex(
        (group) => group.group.uuid === action.payload.group
      );
      if (index >= 0) {
        state.groups = [
          ...state.groups.slice(0, index),
          {
            ...state.groups[index],
            chats: [
              ...state.groups[index].chats,
              {
                ...action.payload,
              },
            ],
          },
          ...state.groups.slice(index + 1),
        ];
      }
    },
  },
  extraReducers: retrieveChatsStateHandler(),
});

export const { getChat } = retrieveChatsSlice.actions;

export default retrieveChatsSlice.reducer;
