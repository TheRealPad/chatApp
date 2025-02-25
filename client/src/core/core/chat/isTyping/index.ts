import { createSlice } from "@reduxjs/toolkit";

import { initialState } from "./initialState.ts";
import { ChatUseCases } from "../types.ts";
import { group } from "@dto";

export const isTypingSlice = createSlice({
  name: ChatUseCases.isTyping,
  initialState,
  reducers: {
    usersTyping(state, action) {
      const index = state.groups.findIndex(
        (current) => current.group.uuid === action.payload.uuid
      );
      state.groups =
        index >= 0
          ? [
              ...state.groups.slice(0, index),
              {
                ...state.groups[index],
                users: action.payload.isTyping
                  ? [...state.groups[index].users, action.payload.user]
                  : state.groups[index].users.filter(
                      (user) => user !== action.payload.user
                    ),
              },
              ...state.groups.slice(index + 1),
            ]
          : [
              {
                group: { ...group, uuid: action.payload.group },
                users: action.payload.isTyping ? [action.payload.user] : [],
              },
            ];
    },
  },
});

export const { usersTyping } = isTypingSlice.actions;

export default isTypingSlice.reducer;
