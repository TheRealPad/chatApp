import { createSlice } from "@reduxjs/toolkit";

import { initialState } from "./initialState.ts";
import { sendChatStateHandler } from "./state.ts";
import { ChatUseCases } from "../types.ts";

export const sendChatSlice = createSlice({
  name: ChatUseCases.sendChat,
  initialState,
  reducers: {},
  extraReducers: sendChatStateHandler(),
});

export default sendChatSlice.reducer;
