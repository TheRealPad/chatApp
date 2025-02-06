import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { initialState } from "./initialState.ts";
import { retrieveUsersStateHandler } from "./state.ts";
import { UserUseCases } from "../types.ts";
import { Identifiable, User } from "@dto";

export const retrieveUserSlice = createSlice({
  name: UserUseCases.retrieveUsers,
  initialState,
  reducers: {
    getConnectedUsers: (state, action: PayloadAction<Identifiable<User>[]>) => {
      state.users = state.users.map((user) => ({
        ...user,
        isConnected:
          action.payload.find((u) => u.uuid === user.uuid) !== undefined,
      }));
    },
  },
  extraReducers: retrieveUsersStateHandler(),
});

export const { getConnectedUsers } = retrieveUserSlice.actions;

export default retrieveUserSlice.reducer;
