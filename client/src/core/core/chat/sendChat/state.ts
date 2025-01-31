import { ActionReducerMapBuilder } from "@reduxjs/toolkit";

import { sendChat } from "@services/core/sendChat.ts";
import { SendChatState } from "./types.ts";

function sendChatStateHandler() {
  return (builder: ActionReducerMapBuilder<SendChatState>) => {
    builder
      .addCase(sendChat.pending, (state) => {
        state.request.isRequestPending = true;
        state.request.isRequestFailure = false;
        state.request.isRequestSuccess = false;
      })
      .addCase(sendChat.fulfilled, (state) => {
        state.request.isRequestPending = false;
        state.request.isRequestFailure = false;
        state.request.isRequestSuccess = true;
      })
      .addCase(sendChat.rejected, (state) => {
        state.request.isRequestPending = false;
        state.request.isRequestFailure = true;
        state.request.isRequestSuccess = false;
      });
  };
}

export { sendChatStateHandler };
