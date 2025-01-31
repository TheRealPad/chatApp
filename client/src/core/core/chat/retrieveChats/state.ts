import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";

import { getChats } from "@services/core/getChats.ts";
import { sendChat } from "@services/core/sendChat";
import { RetrieveChatsState } from "./types.ts";
import { Chat } from "@dto";

function retrieveChatsStateHandler() {
  return (builder: ActionReducerMapBuilder<RetrieveChatsState>) => {
    builder
      .addCase(getChats.pending, (state) => {
        state.request.isRequestPending = true;
        state.request.isRequestFailure = false;
        state.request.isRequestSuccess = false;
        state.error = null;
      })
      .addCase(getChats.fulfilled, (state, action: PayloadAction<Chat[]>) => {
        state.request.isRequestPending = false;
        state.request.isRequestFailure = false;
        state.request.isRequestSuccess = true;
        state.chats = [...state.chats, ...action.payload];
      })
      .addCase(getChats.rejected, (state) => {
        state.request.isRequestPending = false;
        state.request.isRequestFailure = true;
        state.request.isRequestSuccess = false;
      })
      .addCase(
        sendChat.fulfilled,
        (state: any, action: PayloadAction<string>) => {
          state.chats = [...state.chats, action.payload];
        }
      );
  };
}

export { retrieveChatsStateHandler };
